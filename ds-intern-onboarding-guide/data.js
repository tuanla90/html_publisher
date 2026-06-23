/**
 * CẨM NANG ONBOARDING INTERN DATA SCIENCE - NCB BANK
 * Tệp cấu trúc dữ liệu tĩnh phục vụ render động giao diện.
 * Đảm bảo mã hóa UTF-8 chuẩn xác, không bị lỗi font tiếng Việt.
 */

window.NCB_ROADMAP_DATA = {
  // ==========================================
  // TAB 3: BUSINESS & DATA SCHEMA
  // ==========================================
  schema: [
    {
      column: "CLIENTNUM",
      type: "num",
      typeName: "Numerical",
      desc: "Mã định danh duy nhất của từng khách hàng (ID). Lưu ý: Phải loại bỏ cột này khi huấn luyện mô hình để tránh overfitting giả tạo."
    },
    {
      column: "Attrition_Flag",
      type: "cat",
      typeName: "Categorical",
      desc: "<strong>Nhãn mục tiêu (Target Label)</strong>: Biến phân loại trạng thái thẻ. <code>Existing Customer</code> (0 - Khách hàng ở lại) và <code>Attrited Customer</code> (1 - Khách hàng rời đi)."
    },
    {
      column: "Customer_Age",
      type: "num",
      typeName: "Numerical",
      desc: "Độ tuổi của khách hàng (tính bằng năm). Thường dùng để phân tích hành vi chi tiêu theo nhóm tuổi (Gen Z, Millennials, v.v.)."
    },
    {
      column: "Gender",
      type: "cat",
      typeName: "Categorical",
      desc: "Giới tính của chủ thẻ (<code>M</code> = Nam, <code>F</code> = Nữ). Cần mã hóa trước khi đưa vào mô hình."
    },
    {
      column: "Dependent_count",
      type: "num",
      typeName: "Numerical",
      desc: "Số lượng người phụ thuộc tài chính của chủ thẻ (ví dụ: con cái, cha mẹ). Đại diện cho mức độ gánh nặng tài chính gia đình."
    },
    {
      column: "Education_Level",
      type: "cat",
      typeName: "Categorical",
      desc: "Trình độ học vấn cao nhất (Graduate, High School, Uneducated, College, Post-Graduate, Doctorate, Unknown)."
    },
    {
      column: "Marital_Status",
      type: "cat",
      typeName: "Categorical",
      desc: "Tình trạng hôn nhân của khách hàng (Married, Single, Divorced, Unknown)."
    },
    {
      column: "Income_Category",
      type: "cat",
      typeName: "Categorical",
      desc: "Phân khúc thu nhập hàng năm của chủ thẻ (Dưới $40K, $40K - $60K, $60K - $80K, $80K - $120K, Trên $120K, Unknown)."
    },
    {
      column: "Card_Category",
      type: "cat",
      typeName: "Categorical",
      desc: "Hạng thẻ tín dụng hiện tại NCB cấp (Blue, Silver, Gold, Platinum). Hạng thẻ càng cao, phí thường niên càng lớn nhưng ưu đãi càng nhiều."
    },
    {
      column: "Months_on_book",
      type: "num",
      typeName: "Numerical",
      desc: "Thời gian gắn kết của chủ thẻ với NCB (tính theo tháng). Khách hàng thâm niên thường có độ trung thành cao hơn."
    },
    {
      column: "Total_Relationship_Count",
      type: "num",
      typeName: "Numerical",
      desc: "Tổng số lượng sản phẩm/dịch vụ khác mà khách hàng đang sử dụng tại NCB (CASA, Tiết kiệm, Khoản vay...). Thể hiện độ liên kết chéo."
    },
    {
      column: "Months_Inactive_12_mon",
      type: "num",
      typeName: "Numerical",
      desc: "Số tháng khách hàng không phát sinh bất kỳ giao dịch tài chính nào trong 12 tháng qua. Chỉ số quan trọng hàng đầu báo hiệu rủi ro rời bỏ."
    },
    {
      column: "Contacts_Count_12_mon",
      type: "num",
      typeName: "Numerical",
      desc: "Số lần khách hàng chủ động liên hệ với trung tâm chăm sóc khách hàng (NCB Hotline/Phòng giao dịch) trong 12 tháng qua."
    },
    {
      column: "Credit_Limit",
      type: "num",
      typeName: "Numerical",
      desc: "Hạn mức tín dụng tối đa được ngân hàng NCB cấp cho chủ thẻ (VND)."
    },
    {
      column: "Total_Revolving_Bal",
      type: "num",
      typeName: "Numerical",
      desc: "Dư nợ tín dụng gốc cộng dồn chưa thanh toán cuối kỳ (được tính lãi suất trả góp hoặc lãi suất quá hạn) của khách hàng."
    },
    {
      column: "Avg_Open_To_Buy",
      type: "num",
      typeName: "Numerical",
      desc: "Hạn mức tín dụng còn lại chưa chi tiêu trung bình (bằng Hạn mức tín dụng trừ đi số tiền đã tiêu)."
    },
    {
      column: "Total_Amt_Chng_Last_Prev_Q",
      type: "num",
      typeName: "Numerical",
      desc: "Tỷ lệ biến động giá trị giao dịch của quý gần nhất so với quý trước đó (Last Quarter vs Previous Quarter). Tỷ lệ này giảm mạnh cho thấy xu hướng hạn chế chi tiêu thẻ."
    },
    {
      column: "Total_Trans_Amt",
      type: "num",
      typeName: "Numerical",
      desc: "Tổng số tiền đã giao dịch/quẹt thẻ thành công trong 12 tháng qua (VND)."
    },
    {
      column: "Total_Trans_Ct",
      type: "num",
      typeName: "Numerical",
      desc: "Tổng số lần quẹt thẻ giao dịch thành công trong 12 tháng qua. Đo lường tần suất sử dụng thẻ thực tế."
    },
    {
      column: "Total_Ct_Chng_Last_Prev_Q",
      type: "num",
      typeName: "Numerical",
      desc: "Tỷ lệ biến động số lượng giao dịch của quý gần nhất so với quý trước đó (Last Quarter vs Previous Quarter). Nếu tần suất giao dịch sụt giảm nghiêm trọng, nguy cơ churn rất cao."
    },
    {
      column: "Avg_Utilization_Ratio",
      type: "num",
      typeName: "Numerical",
      desc: "Tỷ lệ sử dụng hạn mức trung bình của khách hàng (bằng <code>Total_Revolving_Bal / Credit_Limit</code>). Tỷ lệ quá thấp biểu thị thẻ dormant."
    }
  ],

  // ==========================================
  // TAB 4: CODE LIBRARY
  // ==========================================
  snippets: [
    {
      id: "code-1",
      title: "Tuần 1: Kết nối BigQuery & Kiểm tra chất lượng dữ liệu (Data Access & Profiling)",
      desc: "Đoạn code Python chuẩn giúp intern kết nối trực tiếp với BigQuery của NCB bằng thư viện Google Cloud, thực hiện truy vấn SQL lấy mẫu dữ liệu CASA/Credit Card Churn, kiểm tra kiểu dữ liệu và thống kê tỷ lệ khuyết thiếu (missing values).",
      references: [
        { label: "BigQuery Python Client Documentation", url: "https://googleapis.dev/python/bigquery/latest/index.html" },
        { label: "Pandas Profile & 10-Minute Tutorial", url: "https://pandas.pydata.org/pandas-docs/stable/user_guide/10min.html" },
        { label: "BigQuery Auth & Production Setup", url: "https://cloud.google.com/bigquery/docs/reference/libraries" }
      ],
      code: `import pandas as pd
from google.cloud import bigquery

# 1. Khởi tạo BigQuery Client kết nối với Data Warehouse của NCB
client = bigquery.Client()

# Định nghĩa câu lệnh SQL lấy dữ liệu thẻ tín dụng
query = """
SELECT 
  CLIENTNUM, Attrition_Flag, Customer_Age, Gender, Dependent_count,
  Education_Level, Marital_Status, Income_Category, Card_Category,
  Months_on_book, Total_Relationship_Count, Months_Inactive_12_mon,
  Contacts_Count_12_mon, Credit_Limit, Total_Revolving_Bal,
  Total_Trans_Amt, Total_Trans_Ct, Avg_Utilization_Ratio
FROM \`ncb-dw-production.customer_analytics.credit_card_churn\`
LIMIT 50000
"""

# 2. Truy vấn dữ liệu trực tiếp về DataFrame
print("Đang tải dữ liệu từ BigQuery...")
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
      desc: "Code mẫu dựng giao diện Dashboard tương tác bằng thư viện Streamlit (Python). Bản demo cho phép intern lọc khách hàng theo hạng thẻ tín dụng và hiển thị biểu đồ phân tích xu hướng chi tiêu tương tác trực quan.",
      references: [
        { label: "Streamlit API Reference", url: "https://docs.streamlit.io/library/api-reference" },
        { label: "Plotly Express Scatter Plot Guide", url: "https://plotly.com/python/line-and-scatter/" },
        { label: "Seaborn Visualizations Cheat-sheet", url: "https://seaborn.pydata.org/tutorial/categorical.html" }
      ],
      code: `import streamlit as st
import pandas as pd
import plotly.express as px

# 1. Cấu hình giao diện Streamlit Dashboard của NCB
st.set_page_config(page_title="NCB Credit Card Churn Dashboard", layout="wide")
st.title("📊 NCB Credit Card Churn Analysis Dashboard")
st.markdown("Dashboard phân tích chân dung chủ thẻ tín dụng có rủi ro rời bỏ.")

# 2. Đọc dữ liệu từ file hoặc BigQuery
@st.cache_data
def load_data():
    # Trong thực tế, kết nối BigQuery tại đây. Dùng dữ liệu demo:
    return pd.read_csv("NCB_credit_card_churn.csv")

df = load_data()

# 3. Thanh tác vụ bên trái (Sidebar) để lọc dữ liệu
st.sidebar.header("Bộ lọc tìm kiếm")
card_category = st.sidebar.multiselect(
    "Hạng Thẻ Tín Dụng:",
    options=df["Card_Category"].unique().tolist(),
    default=df["Card_Category"].unique().tolist()
)

# Lọc DataFrame theo điều kiện chọn
filtered_df = df[df["Card_Category"].isin(card_category)]

# 4. Hiển thị các chỉ số cốt lõi (KPI Metrics)
target_numeric = filtered_df["Attrition_Flag"].apply(lambda x: 1 if x == "Attrited Customer" else 0)
churn_rate = target_numeric.mean() * 100
total_customers = len(filtered_df)

col1, col2 = st.columns(2)
col1.metric("Tổng Số Lượng Khách Hàng", f"{total_customers:,}")
col2.metric("Tỷ Lệ Rời Bỏ (Churn Rate)", f"{churn_rate:.2f}%")

# 5. Vẽ biểu đồ trực quan tương tác bằng Plotly
st.subheader("Tương quan giữa Tần suất và Giá trị giao dịch")
fig = px.scatter(
    filtered_df,
    x="Total_Trans_Amt",
    y="Total_Trans_Ct",
    color="Attrition_Flag",
    title="Số Tiền Giao Dịch vs Số Lần Giao Dịch trong 12 Tháng",
    labels={"Total_Trans_Amt": "Tổng Tiền Giao Dịch (VND)", "Total_Trans_Ct": "Tần suất giao dịch (lần)"},
    color_discrete_map={"Existing Customer": "blue", "Attrited Customer": "red"}
)
st.plotly_chart(fig, use_container_width=True)`
    },
    {
      id: "code-3",
      title: "Tuần 3: Tiền xử lý đặc trưng & Lọc biến quan trọng (Feature Selection)",
      desc: "Intern thực hiện xử lý dữ liệu khuyết thiếu, mã hóa biến phân loại với OneHotEncoder, chuẩn hóa các biến số bằng StandardScaler. Đồng thời tính toán mức độ ảnh hưởng đơn biến (correlation/Information Value) để chọn lọc đặc trưng (Feature Shortlisting).",
      references: [
        { label: "Scikit-Learn Preprocessing Guide", url: "https://scikit-learn.org/stable/modules/preprocessing.html" },
        { label: "Weight of Evidence (WOE) & IV Overview", url: "https://www.listendata.com/2015/03/weight-of-evidence-woe-and-information.html" }
      ],
      code: `import numpy as np
import pandas as pd
from sklearn.preprocessing import OneHotEncoder, StandardScaler

# Giả định df đã được tải thành công từ BigQuery
# 1. Phân tách danh sách các cột phân loại và cột số
categorical_cols = ['Gender', 'Education_Level', 'Marital_Status', 'Income_Category', 'Card_Category']
numeric_cols = ['Customer_Age', 'Dependent_count', 'Months_on_book', 'Total_Relationship_Count', 
                'Months_Inactive_12_mon', 'Contacts_Count_12_mon', 'Credit_Limit', 
                'Total_Revolving_Bal', 'Total_Trans_Amt', 'Total_Trans_Ct', 'Avg_Utilization_Ratio']

# Chuyển đổi biến mục tiêu Attrition_Flag sang nhị phân (0: Ở lại, 1: Rời bỏ)
df['target'] = df['Attrition_Flag'].apply(lambda x: 1 if x == 'Attrited Customer' else 0)

# 2. Xử lý giá trị 'Unknown' trong biến phân loại bằng cách gán nhóm phổ biến nhất
for col in categorical_cols:
    most_frequent = df[col].mode()[0]
    df[col] = df[col].replace('Unknown', most_frequent)

# 3. Trích xuất tương quan đơn biến của biến số với Target
print("Tương quan tuyến tính đơn biến với Target (Top ảnh hưởng):")
correlations = df[numeric_cols].corrwith(df['target']).abs().sort_values(ascending=False)
print(correlations)

# 4. Áp dụng Pipeline tiền xử lý
# One-Hot Encoding cho các biến phân loại
encoder = OneHotEncoder(sparse_output=False, drop='first')
encoded_cats = encoder.fit_transform(df[categorical_cols])
encoded_df = pd.DataFrame(encoded_cats, columns=encoder.get_feature_names_out(categorical_cols))

# Chuẩn hóa (Z-score Scaling) các biến số
scaler = StandardScaler()
scaled_nums = scaler.fit_transform(df[numeric_cols])
scaled_df = pd.DataFrame(scaled_nums, columns=numeric_cols)

# Hợp nhất các biến đặc trưng sau xử lý
X_processed = pd.concat([scaled_df, encoded_df], axis=1)
y = df['target']
print("\\nHình dáng tập dữ liệu đặc trưng cuối cùng:", X_processed.shape)`
    },
    {
      id: "code-4",
      title: "Tuần 4: Huấn luyện mô hình RandomForest, Đánh giá & Liên kết Looker Studio",
      desc: "Đoạn mã hoàn chỉnh huấn luyện mô hình Random Forest phân loại khách hàng có nguy cơ rời bỏ, đánh giá hiệu năng (Precision, Recall, ROC-AUC) và thực hiện export dữ liệu dự đoán cùng mức độ quan trọng đặc trưng (Feature Importance) lên BigQuery phục vụ làm Dashboard trên Looker Studio.",
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

# 2. Huấn luyện mô hình Random Forest Classifier (Cấu hình tối ưu tránh Overfitting)
model = RandomForestClassifier(n_estimators=150, max_depth=8, min_samples_leaf=4, random_state=42)
model.fit(X_train, y_train)

# 3. Dự đoán trên tập Test và đánh giá chi tiết hiệu năng mô hình
y_pred = model.predict(X_test)
y_pred_proba = model.predict_proba(X_test)[:, 1]

print("=== BÁO CÁO HIỆU NĂNG MÔ HÌNH (RANDOM FOREST) ===")
print(classification_report(y_test, y_pred))
print(f"Chỉ số ROC-AUC: {roc_auc_score(y_test, y_pred_proba):.4f}")

# 4. Trích xuất Feature Importance (Độ quan trọng của đặc trưng)
importances = model.feature_importances_
feature_imp_df = pd.DataFrame({
    'feature': X_processed.columns,
    'importance': importances
}).sort_values(by='importance', ascending=False)

print("\\nTop 5 biến ảnh hưởng nhất tới quyết định rời bỏ thẻ:")
print(feature_imp_df.head(5))

# 5. [OPTIONAL] Xuất kết quả dự đoán và Feature Importance lên BigQuery để vẽ Dashboard Looker Studio
# Chuẩn bị DataFrame chứa mã khách hàng, thực tế và xác suất dự đoán Churn
test_indices = y_test.index
predictions_df = pd.DataFrame({
    'CLIENTNUM': df.loc[test_indices, 'CLIENTNUM'],
    'Actual_Status': y_test,
    'Churn_Probability': y_pred_proba
})

# Kết nối và ghi đè vào bảng BigQuery tạm để làm nguồn cấp cho Looker Studio
bq_client = bigquery.Client()
table_predictions_id = "ncb-dw-production.customer_analytics.churn_predictions_output"
table_importance_id = "ncb-dw-production.customer_analytics.churn_feature_importance"

# Cấu hình job ghi đè (WRITE_TRUNCATE) lên BigQuery
job_config = bigquery.LoadJobConfig(write_disposition="WRITE_TRUNCATE")

# Đẩy dữ liệu dự đoán
print("\\nĐang xuất kết quả dự đoán lên BigQuery...")
bq_client.load_table_from_dataframe(predictions_df, table_predictions_id, job_config=job_config).result()
# Đẩy dữ liệu Feature Importance
print("Đang xuất mức độ quan trọng đặc trưng lên BigQuery...")
bq_client.load_table_from_dataframe(feature_imp_df, table_importance_id, job_config=job_config).result()
print("Hoàn thành! Bạn có thể truy cập Looker Studio để vẽ Dashboard từ 2 nguồn dữ liệu trên.")`
    }
  ],

  // ==========================================
  // TAB 5: EVALUATION & MENTOR TOOLKIT
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
            desc: "Truy vấn BigQuery mượt mà; Code sạch sẽ, chia rõ các phần. Trực quan hóa đầy đủ phân phối của nhãn target và mối liên hệ giữa các biến số quan trọng. Có nhận xét nghiệp vụ sâu sắc bên dưới mỗi biểu đồ."
          },
          {
            level: "Khá (B)",
            desc: "Kết nối BigQuery thành công; Vẽ được các biểu đồ EDA cơ bản. Có nhận xét về phân phối dữ liệu nhưng còn chung chung, chưa liên hệ rõ ràng với ngữ cảnh kinh doanh ngân hàng."
          },
          {
            level: "Trung bình (C)",
            desc: "Notebook chạy được nhưng code lộn xộn; Các biểu đồ trực quan hóa bị lỗi font chữ hoặc thiếu nhãn trục; Phân tích sơ sài, thiếu nhận xét nghiệp vụ."
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
            desc: "Dashboard trực quan sinh động, cho phép lọc theo nhóm tuổi/hạng thẻ. Slide phân tích chỉ ra được chính xác 3 đặc điểm nổi bật nhất của nhóm khách hàng rời bỏ (ví dụ: sụt giảm giao dịch Q4 so với Q1) kèm đề xuất hành động thuyết phục."
          },
          {
            level: "Khá (B)",
            desc: "Dashboard chạy được nhưng giao diện còn đơn giản, ít tương tác. Slide có nêu ra các đặc điểm của khách hàng churn nhưng các khuyến nghị giữ chân còn mang tính lý thuyết đại trà."
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
            desc: "Xử lý triệt để dữ liệu khuyết thiếu và dữ liệu nhiễu. Sử dụng các phương pháp phân tích đơn biến một cách bài bản (Correlation, Information Value - IV). Giải trình khoa học lý do giữ hoặc loại bỏ từng đặc trưng."
          },
          {
            level: "Khá (B)",
            desc: "Có thực hiện tiền xử lý dữ liệu cơ bản và lập bảng shortlist. Tuy nhiên, lập luận loại bỏ một số biến còn mang tính cảm quan, chưa thuyết phục bằng số liệu định lượng."
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
            desc: "Mô hình hoạt động tốt (ROC-AUC > 0.85). Kỹ năng Storytelling thuyết phục: liên kết chặt chẽ kết quả mô hình ML với hành động nghiệp vụ thực tế. Trả lời trôi chảy các câu hỏi phản biện của Hội đồng."
          },
          {
            level: "Khá (B)",
            desc: "Mô hình đạt AUC khá (0.75 - 0.85). Thuyết trình lưu loát nhưng slide còn nặng về mặt kỹ thuật, chưa làm nổi bật được cách NCB ứng dụng kết quả dự đoán này vào thực tiễn."
          },
          {
            level: "Trung bình (C)",
            desc: "Mô hình bị overfitting nặng (AUC trên tập train rất cao nhưng test rất thấp). Thuyết trình chủ yếu đọc slide, lúng túng khi giải thích các khái niệm Precision/Recall."
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
        desc: "Bất kể khi nào intern trình bày kết quả kỹ thuật (ví dụ: phân phối biến chi tiêu lệch phải), hãy đặt câu hỏi gợi mở: 'Điều này có ý nghĩa gì đối với việc kinh doanh thẻ tín dụng của NCB?', 'Chúng ta nên thiết lập chiến dịch giữ chân khách hàng như thế nào dựa trên phát hiện này?' để rèn luyện tư duy sản phẩm."
      }
    ],

    templates: [
      {
        id: "temp-feedback-1",
        title: "Tuần 1: Nhận xét Notebook BigQuery & EDA",
        text: `Chào [Tên Intern],

Anh/chị đã xem qua Jupyter Notebook phân tích EDA của em trong Tuần 1.

Điểm tốt:
- Kết nối thành công BigQuery NCB và truy vấn đúng tập mẫu.
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
- Slide phân tích chỉ ra được 3 hành vi chính của khách hàng trước khi rời bỏ (giảm tần suất quẹt thẻ, số dư revolving giảm, tăng liên hệ hotline).

Cần cải thiện:
- Cần bổ sung thêm phần tính toán chi phí: Giả sử NCB giữ chân thành công 10% nhóm này thì lợi nhuận đem lại so với chi phí gửi quà tặng/miễn phí thường niên là bao nhiêu?
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
- Đã giải quyết tốt vấn đề giá trị 'Unknown' trong các biến phân loại.

Cần cải thiện:
- Việc loại bỏ biến 'Card_Category' cần được cân nhắc kỹ hơn. Dù độ tương quan tuyến tính thấp, nhưng ở các phân khúc thẻ Platinum/Gold, chi phí giữ chân chủ thẻ rất khác so với hạng thẻ Blue. Hãy giữ lại biến này để chạy thử với mô hình phi tuyến ở Tuần 4.

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
- Đã hoàn thành phần Optional kết nối Dashboard Looker Studio rất trực quan, giúp các stakeholder dễ dàng theo dõi kết quả.

Cần cải thiện:
- Khi trả lời câu hỏi về Recall và Precision, cần nhấn mạnh rằng trong bài toán Churn, NCB ưu tiên Recall (chấp nhận dự đoán nhầm còn hơn bỏ sót khách hàng thực sự rời đi).

Đánh giá chung: HOÀN THÀNH XUẤT SẮC KỲ ĐÀO TẠO. Chúc em tiếp tục vững bước trên con đường Data Science sắp tới!`
      }
    ]
  }
};
