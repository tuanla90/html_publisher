/**
 * CẨM NANG ONBOARDING INTERN DATA SCIENCE - NCB BANK
 * Tệp cấu trúc dữ liệu tĩnh phục vụ render động giao diện (nhánh CASA Churn).
 * Đảm bảo mã hóa UTF-8 chuẩn xác, không bị lỗi font tiếng Việt.
 */

window.NCB_ROADMAP_DATA = {
  // ==========================================
  // TAB 4: CODE LIBRARY (CASA CHURN USE CASE)
  // ==========================================
  snippets: [
    {
      id: "code-1",
      title: "Tuần 1: Kết nối BigQuery & Kiểm tra chất lượng dữ liệu (Data Access & Profiling)",
      desc: "Đoạn code Python chuẩn giúp intern kết nối trực tiếp với Data Warehouse của NCB trên BigQuery bằng thư viện Google Cloud, thực hiện truy vấn SQL lấy mẫu dữ liệu CASA Churn của phân khúc khách hàng cá nhân, kiểm tra kiểu dữ liệu và thống kê tỷ lệ khuyết thiếu (missing values).",
      references: [
        { label: "BigQuery Python Client Documentation", url: "https://googleapis.dev/python/bigquery/latest/index.html" },
        { label: "Pandas Profile & 10-Minute Tutorial", url: "https://pandas.pydata.org/pandas-docs/stable/user_guide/10min.html" },
        { label: "BigQuery Auth & Production Setup", url: "https://cloud.google.com/bigquery/docs/reference/libraries" }
      ],
      code: `import pandas as pd
from google.cloud import bigquery

# 1. Khởi tạo BigQuery Client kết nối với Data Warehouse của NCB
client = bigquery.Client()

# Định nghĩa câu lệnh SQL lấy dữ liệu CASA Churn (từ bảng casa_churn thực tế)
query = """
SELECT 
  CLIENTNUM, Attrition_Flag, Customer_Age, Gender, Months_on_book,
  CASA_Balance_Current, CASA_Balance_Prev_Q, CASA_Balance_Chng_Last_Prev_Q,
  Salary_Credit_Flag, Total_Trans_Amt_12m, Total_Trans_Ct_12m,
  Trans_Ct_Chng_Last_Prev_Q, Active_Ebanking_Flag, Bill_Payment_Count_12m,
  Debit_Card_Spend_Amt_12m, Months_Inactive_12m, Contacts_Count_12m,
  Saving_Balance, Credit_Card_Active, Avg_Balance_12m, Overdraft_Limit
FROM \`ncb-dw-production.customer_analytics.casa_churn\`
LIMIT 50000
"""

# 2. Truy vấn dữ liệu trực tiếp về DataFrame
print("Đang tải dữ liệu CASA Churn từ BigQuery...")
df = client.query(query).to_dataframe()
print(f"Đã tải thành công {df.shape[0]} dòng và {df.shape[1]} cột.\\n")

# 3. Data Profiling - Kiểm tra cấu trúc và kiểu dữ liệu
print("--- THÔNG TIN CẤU TRÚC DATAFRAME ---")
print(df.info())

# 4. Kiểm tra tỷ lệ khuyết thiếu (Missing Values) trên từng cột
print("\\n--- TỶ LỆ KHUYẾT THIẾU (%) ---")
missing_pct = df.isnull().mean() * 100
print(missing_pct[missing_pct > 0].sort_values(ascending=False))

# 5. Phân tích phân phối nhãn mục tiêu (Target Class Imbalance)
print("\\n--- PHÂN PHỐI NHÃN MỤC TIÊU ---")
print(df['Attrition_Flag'].value_counts(normalize=True) * 100)`
    },
    {
      id: "code-2",
      title: "Tuần 2: Trực quan hóa dữ liệu EDA & Bản mẫu Dashboard Streamlit (EDA & Dashboarding)",
      desc: "Code mẫu dựng giao diện Dashboard tương tác bằng Streamlit (Python) phục vụ theo dõi chỉ số CASA Churn. Bản demo cho phép intern lọc khách hàng theo giới tính/trạng thái E-banking và hiển thị phân phối số dư tài khoản thanh toán CASA giữa nhóm hoạt động và nhóm rời bỏ.",
      references: [
        { label: "Streamlit API Reference", url: "https://docs.streamlit.io/library/api-reference" },
        { label: "Plotly Express Scatter Plot Guide", url: "https://plotly.com/python/line-and-scatter/" },
        { label: "Seaborn Visualizations Cheat-sheet", url: "https://seaborn.pydata.org/tutorial/categorical.html" }
      ],
      code: `import streamlit as st
import pandas as pd
import plotly.express as px

# 1. Cấu hình giao diện Streamlit Dashboard của NCB
st.set_page_config(page_title="NCB CASA Churn Dashboard", layout="wide")
st.title("📊 NCB CASA Churn Analysis Dashboard")
st.markdown("Dashboard phân tích hành vi duy trì số dư CASA và rủi ro rời bỏ của khách hàng.")

# 2. Đọc dữ liệu từ file hoặc BigQuery
@st.cache_data
def load_data():
    # Trong thực tế, kết nối BigQuery tại đây. Dùng dữ liệu demo:
    return pd.read_csv("NCB_casa_churn_data.csv")

df = load_data()

# 3. Thanh tác vụ bên trái (Sidebar) để lọc dữ liệu
st.sidebar.header("Bộ lọc tìm kiếm")
ebanking_status = st.sidebar.multiselect(
    "Trạng thái E-banking (1: Active, 0: Inactive):",
    options=df["Active_Ebanking_Flag"].unique().tolist(),
    default=df["Active_Ebanking_Flag"].unique().tolist()
)

# Lọc DataFrame theo điều kiện chọn
filtered_df = df[df["Active_Ebanking_Flag"].isin(ebanking_status)]

# 4. Hiển thị các chỉ số cốt lõi (KPI Metrics)
target_numeric = filtered_df["Attrition_Flag"].apply(lambda x: 1 if x == "Attrited Customer" else 0)
churn_rate = target_numeric.mean() * 100
avg_casa_bal = filtered_df["CASA_Balance_Current"].mean()

col1, col2 = st.columns(2)
col1.metric("Số dư CASA trung bình (VND)", f"{avg_casa_bal:,.0f}đ")
col2.metric("Tỷ Lệ Rời Bỏ (CASA Churn Rate)", f"{churn_rate:.2f}%")

# 5. Vẽ biểu đồ tương quan trực quan bằng Plotly
st.subheader("Tương quan giữa số dư CASA hiện tại và tần suất giao dịch")
fig = px.scatter(
    filtered_df,
    x="CASA_Balance_Current",
    y="Total_Trans_Ct_12m",
    color="Attrition_Flag",
    title="Số dư CASA vs Số Lần Giao Dịch trong 12 Tháng",
    labels={"CASA_Balance_Current": "Số dư CASA hiện tại (VND)", "Total_Trans_Ct_12m": "Số lần giao dịch (12 tháng)"},
    color_discrete_map={"Existing Customer": "blue", "Attrited Customer": "red"}
)
st.plotly_chart(fig, use_container_width=True)`
    },
    {
      id: "code-3",
      title: "Tuần 3: Tiền xử lý đặc trưng & Lọc biến quan trọng (Feature Selection)",
      desc: "Intern thực hiện xử lý dữ liệu khuyết thiếu cho các biến số dư và giao dịch, mã hóa các biến phân loại (Active_Ebanking_Flag, Salary_Credit_Flag) bằng OneHotEncoder, chuẩn hóa các biến số liên tục bằng StandardScaler. Đồng thời tính toán mức độ tương quan tuyến tính để đưa ra bảng shortlist các biến quan trọng nhất.",
      references: [
        { label: "Scikit-Learn Preprocessing Guide", url: "https://scikit-learn.org/stable/modules/preprocessing.html" },
        { label: "Weight of Evidence (WOE) & IV Overview", url: "https://www.listendata.com/2015/03/weight-of-evidence-woe-and-information.html" }
      ],
      code: `import numpy as np
import pandas as pd
from sklearn.preprocessing import OneHotEncoder, StandardScaler

# Giả định df đã được tải thành công từ BigQuery
# 1. Phân tách danh sách các cột phân loại và cột số liên quan đến tài khoản thanh toán
categorical_cols = ['Gender', 'Salary_Credit_Flag', 'Active_Ebanking_Flag', 'Credit_Card_Active']
numeric_cols = ['Customer_Age', 'Months_on_book', 'CASA_Balance_Current', 'CASA_Balance_Chng_Last_Prev_Q', 
                'Total_Trans_Amt_12m', 'Total_Trans_Ct_12m', 'Trans_Ct_Chng_Last_Prev_Q', 
                'Bill_Payment_Count_12m', 'Debit_Card_Spend_Amt_12m', 'Months_Inactive_12m', 
                'Contacts_Count_12m', 'Saving_Balance', 'Avg_Balance_12m', 'Overdraft_Limit']

# Chuyển đổi nhãn mục tiêu Attrition_Flag sang nhị phân (0: Ở lại, 1: Rời bỏ/Ngủ đông)
df['target'] = df['Attrition_Flag'].apply(lambda x: 1 if x == 'Attrited Customer' else 0)

# 2. Xử lý khuyết thiếu (gán số dư trung bình cho các cột số)
for col in numeric_cols:
    if df[col].isnull().sum() > 0:
        df[col] = df[col].fillna(df[col].median())

# 3. Trích xuất tương quan đơn biến của biến số với Target
print("Tương quan tuyến tính đơn biến với Target (Top biến ảnh hưởng đến CASA Churn):")
correlations = df[numeric_cols].corrwith(df['target']).abs().sort_values(ascending=False)
print(correlations)

# 4. Áp dụng Pipeline tiền xử lý
# One-Hot Encoding cho các biến phân loại và E-banking
encoder = OneHotEncoder(sparse_output=False, drop='first')
encoded_cats = encoder.fit_transform(df[categorical_cols])
encoded_df = pd.DataFrame(encoded_cats, columns=encoder.get_feature_names_out(categorical_cols))

# Chuẩn hóa (Standardization) các biến số dư và giao dịch
scaler = StandardScaler()
scaled_nums = scaler.fit_transform(df[numeric_cols])
scaled_df = pd.DataFrame(scaled_nums, columns=numeric_cols)

# Hợp nhất các biến đặc trưng sau xử lý để đưa vào model
X_processed = pd.concat([scaled_df, encoded_df], axis=1)
y = df['target']
print("\\nHình dáng tập dữ liệu đặc trưng cuối cùng:", X_processed.shape)`
    },
    {
      id: "code-4",
      title: "Tuần 4: Huấn luyện mô hình RandomForest, Đánh giá & Liên kết Looker Studio",
      desc: "Đoạn mã hoàn chỉnh huấn luyện mô hình Random Forest phân loại khách hàng có nguy cơ rời bỏ tài khoản CASA, đánh giá hiệu năng (Precision, Recall, ROC-AUC) và thực hiện export dữ liệu dự đoán cùng mức độ quan trọng đặc trưng (Feature Importance) lên BigQuery phục vụ làm Dashboard trên Looker Studio.",
      references: [
        { label: "Scikit-Learn RandomForestClassifier Docs", url: "https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html" },
        { label: "Pandas-GBQ BigQuery Writer Documentation", url: "https://pandas-gbq.readthedocs.io/en/latest/" },
        { label: "Looker Studio BigQuery Connector Guide", url: "https://support.google.com/looker-studio/answer/6370295" }
      ],
      code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score
from google.cloud import bigquery

# 1. Phân chia tập huấn luyện và tập kiểm thử (Tỉ lệ 80/20, phân tầng theo nhãn target)
X_train, X_test, y_train, y_test = train_test_split(
    X_processed, y, test_size=0.2, random_state=42, stratify=y
)

# 2. Huấn luyện mô hình Random Forest Classifier (Cấu hình tham số kiểm soát Overfitting)
model = RandomForestClassifier(n_estimators=150, max_depth=8, min_samples_leaf=4, random_state=42)
model.fit(X_train, y_train)

# 3. Dự đoán trên tập Test và đánh giá chi tiết hiệu năng mô hình
y_pred = model.predict(X_test)
y_pred_proba = model.predict_proba(X_test)[:, 1]

print("=== BÁO CÁO HIỆU NĂNG MÔ HÌNH DỰ ĐOÁN CASA CHURN ===")
print(classification_report(y_test, y_pred))
print(f"Chỉ số ROC-AUC: {roc_auc_score(y_test, y_pred_proba):.4f}")

# 4. Trích xuất Feature Importance (Độ quan trọng của đặc trưng đối với CASA Churn)
importances = model.feature_importances_
feature_imp_df = pd.DataFrame({
    'feature': X_processed.columns,
    'importance': importances
}).sort_values(by='importance', ascending=False)

print("\\nTop 5 biến ảnh hưởng nhất tới quyết định ngừng sử dụng tài khoản CASA:")
print(feature_imp_df.head(5))

# 5. Xuất kết quả dự đoán lên BigQuery để kết nối Looker Studio
# Chuẩn bị DataFrame chứa mã khách hàng, thực tế và xác suất dự đoán Churn
test_indices = y_test.index
predictions_df = pd.DataFrame({
    'CLIENTNUM': df.loc[test_indices, 'CLIENTNUM'],
    'Actual_Status': y_test,
    'Churn_Probability': y_pred_proba
})

# Ghi đè kết quả lên BigQuery
bq_client = bigquery.Client()
table_predictions_id = "ncb-dw-production.customer_analytics.casa_churn_predictions_output"
table_importance_id = "ncb-dw-production.customer_analytics.casa_churn_feature_importance"

job_config = bigquery.LoadJobConfig(write_disposition="WRITE_TRUNCATE")

print("\\nĐang xuất kết quả dự đoán lên BigQuery...")
bq_client.load_table_from_dataframe(predictions_df, table_predictions_id, job_config=job_config).result()
print("Đang xuất mức độ quan trọng đặc trưng lên BigQuery...")
bq_client.load_table_from_dataframe(feature_imp_df, table_importance_id, job_config=job_config).result()
print("Hoàn thành! Bạn có thể cập nhật Dashboard Looker Studio của mình từ bảng trên.")`
    }
  ],

  // ==========================================
  // TAB 5: EVALUATION & MENTOR TOOLKIT (CASA CHURN)
  // ==========================================
  evaluation: {
    rubrics: [
      {
        week: "Tuần 1",
        title: "BigQuery & Exploratory Data Analysis (EDA)",
        deliverable: "Jupyter Notebook phân tích dữ liệu đơn biến và đa biến lấy từ BigQuery.",
        criteria: [
          {
            level: "Xuất sắc (A)",
            desc: "Truy vấn BigQuery mượt mà; Code sạch sẽ, chia rõ các phần. Trực quan hóa đầy đủ phân phối của số dư CASA bình quân và mối liên hệ giữa các biến số quan trọng. Có nhận xét nghiệp vụ sâu sắc về xu hướng rút ròng vốn không kỳ hạn bên dưới mỗi biểu đồ."
          },
          {
            level: "Khá (B)",
            desc: "Kết nối BigQuery thành công; Vẽ được các biểu đồ EDA cơ bản. Có nhận xét về phân phối dữ liệu số dư và giao dịch nhưng còn chung chung, chưa liên hệ rõ ràng với ngữ cảnh CASA ngân hàng."
          },
          {
            level: "Trung bình (C)",
            desc: "Notebook chạy được nhưng code lộn xộn; Các biểu đồ trực quan hóa bị lỗi font chữ hoặc thiếu nhãn trục; Phân tích sơ sài, thiếu nhận xét nghiệp vụ về CASA."
          },
          {
            level: "Không đạt (D/F)",
            desc: "Không kết nối được BigQuery hoặc code bị lỗi crash; Thiếu hoàn toàn các bước phân tích khám phá dữ liệu cơ bản."
          }
        ]
      },
      {
        week: "Tuần 2",
        title: "Python Dashboard & Slide Nghiệp Vụ",
        deliverable: "Dashboard Python tương tác (Streamlit/Dash) & Slide thuyết trình 5 trang.",
        criteria: [
          {
            level: "Xuất sắc (A)",
            desc: "Dashboard trực quan sinh động, cho phép lọc theo nhóm tuổi/trạng thái nhận lương. Slide phân tích chỉ ra được chính xác 3 đặc điểm nổi bật nhất của nhóm khách hàng rời bỏ CASA (ví dụ: sụt giảm số dư CASA đột ngột, không phát sinh giao dịch trong >2 tháng) kèm đề xuất hành động thuyết phục."
          },
          {
            level: "Khá (B)",
            desc: "Dashboard chạy được nhưng giao diện còn đơn giản, ít tương tác. Slide có nêu ra các đặc điểm của khách hàng churn nhưng các khuyến nghị giữ chân (ví dụ: tăng lãi suất bậc thang) còn mang tính lý thuyết đại trà."
          },
          {
            level: "Trung bình (C)",
            desc: "Dashboard chỉ hiển thị biểu đồ tĩnh không có bộ lọc. Slide thiết kế cẩu thả, thông tin trình bày rối rắm, không chỉ rõ được chân dung churn."
          },
          {
            level: "Không đạt (D/F)",
            desc: "Không bàn giao dashboard hoặc dashboard lỗi không chạy; Slide thiếu thông tin hoặc sai lệch hoàn toàn về dữ liệu."
          }
        ]
      },
      {
        week: "Tuần 3",
        title: "Feature Selection & Preprocessing",
        deliverable: "Bảng Feature Shortlist kèm báo cáo giải trình chi tiết về kỹ thuật chọn lọc.",
        criteria: [
          {
            level: "Xuất sắc (A)",
            desc: "Xử lý triệt để dữ liệu khuyết thiếu và dữ liệu nhiễu số dư. Sử dụng các phương pháp phân tích đơn biến một cách bài bản (Correlation, Information Value - IV). Giải trình khoa học lý do giữ hoặc loại bỏ từng đặc trưng (ví dụ: giải trình độ tương quan cao giữa CASA_Balance_Current và Avg_Balance_12m)."
          },
          {
            level: "Khá (B)",
            desc: "Có thực hiện tiền xử lý dữ liệu cơ bản và lập bảng shortlist. Tuy nhiên, lập luận loại bỏ một số biến số dư/giao dịch còn mang tính cảm quan, chưa thuyết phục bằng số liệu định lượng."
          },
          {
            level: "Trung bình (C)",
            desc: "Chỉ thực hiện One-Hot Encoding cơ bản; Shortlist thiếu nhiều biến quan trọng; Không giải thích được nguyên nhân giữ/loại bỏ đặc trưng."
          },
          {
            level: "Không đạt (D/F)",
            desc: "Không thực hiện tiền xử lý dữ liệu (để nguyên dữ liệu gốc bị lỗi vào mô hình); Không nộp bảng shortlist."
          }
        ]
      },
      {
        week: "Tuần 4",
        title: "Model Development & Final Demo",
        deliverable: "Mô hình RandomForest/XGBoost hoàn chỉnh đạt AUC mục tiêu & Thuyết trình Demo 10 phút.",
        criteria: [
          {
            level: "Xuất sắc (A)",
            desc: "Mô hình hoạt động tốt (ROC-AUC > 0.85). Kỹ năng Storytelling thuyết phục: liên kết chặt chẽ kết quả mô hình dự báo CASA Churn với hành động nghiệp vụ thực tế (chiến dịch ưu đãi phí, gửi thông điệp push notification tự động). Trả lời trôi chảy các câu hỏi phản biện."
          },
          {
            level: "Khá (B)",
            desc: "Mô hình đạt AUC khá (0.75 - 0.85). Thuyết trình lưu loát nhưng slide còn nặng về mặt kỹ thuật, chưa làm nổi bật được cách NCB ứng dụng kết quả dự đoán nguy cơ churn này vào thực tiễn quản lý nguồn vốn."
          },
          {
            level: "Trung bình (C)",
            desc: "Mô hình bị overfitting nặng (AUC trên tập train rất cao nhưng test rất thấp). Thuyết trình chủ yếu đọc slide, lúng túng khi giải thích các khái niệm Precision/Recall áp dụng trong bài toán Churn."
          },
          {
            level: "Không đạt (D/F)",
            desc: "Mô hình không chạy được hoặc AUC < 0.65. Thuyết trình quá giờ, không nêu được kết quả và định hướng ứng dụng."
          }
        ]
      }
    ],

    mentorGuide: [
      {
        title: "Nguyên Tắc Không Làm Hộ (Hands-off Coaching)",
        desc: "Tuyệt đối không gõ code hộ hoặc gửi các file chạy sẵn khi intern gặp lỗi (syntax error, library mismatch). Thay vào đó, hãy chỉ ra dòng code lỗi, giải thích bản chất (ví dụ: lỗi shape mismatch do OneHotEncoder chưa fit) và gợi ý các tài liệu tham khảo chính thống để intern tự sửa đổi."
      },
      {
        title: "Duy trì Standup & Checkpoint",
        desc: "Thực hiện Daily Standup 15 phút cố định vào 9:00 sáng mỗi ngày. Định dạng báo cáo gồm 3 câu hỏi: 1. Hôm qua em đã làm được gì? 2. Hôm nay em định làm gì? 3. Em có gặp khó khăn hay vướng mắc (blockers) nào cần hỗ trợ không? Cuối ngày lúc 17:00, thực hiện quick review tiến độ trong ngày."
      },
      {
        title: "Rèn luyện tư duy Nghiệp vụ (Business Sense)",
        desc: "Bất kể khi nào intern trình bày kết quả kỹ thuật (ví dụ: phân phối biến chi tiêu lệch phải), hãy đặt câu hỏi gợi mở: 'Điều này có ý nghĩa gì đối với việc huy động nguồn vốn CASA của NCB?', 'Chúng ta nên thiết lập chiến dịch giữ chân khách hàng như thế nào dựa trên phát hiện này?' để rèn luyện tư duy sản phẩm."
      }
    ],

    templates: [
      {
        id: "temp-feedback-1",
        title: "Tuần 1: Nhận xét Notebook BigQuery & EDA",
        text: `Chào [Tên Intern],

Anh/chị đã xem qua Jupyter Notebook phân tích EDA của em trong Tuần 1.

Điểm tốt:
- Kết nối thành công BigQuery NCB và truy vấn đúng tập mẫu CASA Churn.
- Thể hiện kỹ năng viết code Pandas mạch lạc, có phân chia cấu trúc rõ ràng.

Cần cải thiện:
- Các biểu đồ phân phối cần chú thích rõ đơn vị tiền tệ (VND) ở trục hoành.
- Em nên viết nhận xét ngắn về nghiệp vụ dưới mỗi biểu đồ: Ví dụ, tại sao nhóm khách hàng có 'Months_Inactive_12_mon' > 3 tháng lại có tỷ lệ phân bố Target dịch chuyển mạnh về nhóm rời bỏ?

Đánh giá chung: ĐẠT YÊU CẦU. Hãy chuẩn bị các biểu đồ này để đưa lên dashboard ở Tuần 2 nhé!`
      },
      {
        id: "temp-feedback-2",
        title: "Tuần 2: Nhận xét Dashboard & Slide chân dung Churn",
        text: `Chào [Tên Intern],

Anh/chị đã trải nghiệm dashboard Streamlit và đọc slide phân tích chân dung khách hàng Churn của em.

Điểm tốt:
- Dashboard trực quan, phối màu đúng nhận diện thương hiệu NCB (Blue/Red). Giao diện chạy mượt mà.
- Slide phân tích chỉ ra được 3 hành vi chính của khách hàng trước khi rời bỏ (giảm số dư tài khoản thanh toán, giảm tần suất giao dịch e-banking, tăng liên hệ hotline).

Cần cải thiện:
- Cần bổ sung thêm phần tính toán chi phí: Giả sử NCB giữ chân thành công 10% nhóm này thì số tiền CASA bảo toàn được là bao nhiêu so với chi phí chạy chiến dịch khuyến mãi hoặc tặng voucher?
- Dashboard nên thêm phần hướng dẫn sử dụng nhanh cho các anh chị RM (Relationship Manager).

Đánh giá chung: XUẤT SẮC. Em đã hoàn thành rất tốt Giai đoạn 1!`
      },
      {
        id: "temp-feedback-3",
        title: "Tuần 3: Đánh giá Feature Selection Report",
        text: `Chào [Tên Intern],

Anh/chị đã đọc báo cáo Feature Shortlist của em.

Điểm tốt:
- Có sự đầu tư tính toán chỉ số Information Value (IV) cho từng đặc trưng và so sánh với hệ số tương quan Correlation.
- Đã giải quyết tốt vấn đề giá trị khuyết thiếu trong các biến số dư.

Cần cải thiện:
- Việc loại bỏ biến 'Active_Ebanking_Flag' cần được cân nhắc kỹ hơn. Dù độ tương quan tuyến tính thấp, nhưng trạng thái đăng nhập app e-banking là chỉ báo rất mạnh cho thấy tài khoản có bị dormant hay không. Hãy giữ lại biến này để chạy thử với mô hình phi tuyến ở Tuần 4.

Đánh giá chung: ĐẠT YÊU CẦU. Em bắt đầu build baseline model với các biến đã chọn nhé!`
      },
      {
        id: "temp-feedback-4",
        title: "Tuần 4: Nhận xét Demo mô hình ML & Thuyết trình cuối kỳ",
        text: `Chào [Tên Intern],

Chúc mừng em đã hoàn thành buổi báo cáo thử nghiệm cuối kỳ hôm nay trước Hội đồng.

Điểm tốt:
- Mô hình Random Forest đạt chỉ số ROC-AUC tốt (0.86 trên tập Test), kiểm soát được Overfitting.
- Phong cách thuyết trình tự tin, mạch lạc, biết cách dẫn dắt câu chuyện từ dữ liệu thô đến giải pháp nghiệp vụ đề xuất.
- Đã hoàn thành phần kết nối Dashboard Looker Studio rất trực quan, giúp các stakeholder dễ dàng theo dõi kết quả.

Cần cải thiện:
- Khi trả lời câu hỏi về Recall và Precision, cần nhấn mạnh rằng trong bài toán Churn, NCB ưu tiên Recall (chấp nhận dự đoán nhầm còn hơn bỏ sót khách hàng thực sự rời đi).

Đánh giá chung: HOÀN THÀNH XUẤT SẮC KỲ ĐÀO TẠO. Chúc em tiếp tục vững bước trên con đường Data Science sắp tới!`
      }
    ]
  }
};
