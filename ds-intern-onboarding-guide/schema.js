/**
 * TỪ ĐIỂN DỮ LIỆU (DATA DICTIONARY) - BÀI TOÁN CASA CHURN NCB
 * Lưu trữ độc lập để dễ dàng cập nhật các thông số và định nghĩa cột.
 */

window.NCB_SCHEMA_DATA = [
  {
    column: "CLIENTNUM",
    type: "num",
    typeName: "Numerical",
    desc: "Mã định danh duy nhất của từng khách hàng tại hệ thống NCB (ID). Lưu ý: Phải loại bỏ cột này khi huấn luyện mô hình để tránh overfitting giả tạo."
  },
  {
    column: "Attrition_Flag",
    type: "cat",
    typeName: "Categorical",
    desc: "<strong>Nhãn mục tiêu (Target Label)</strong>: Trạng thái rời bỏ tài khoản. <code>Existing Customer</code> (0 - Khách hàng hoạt động bình thường) và <code>Attrited Customer</code> (1 - Khách hàng rời bỏ/ngừng sử dụng tài khoản)."
  },
  {
    column: "Customer_Age",
    type: "num",
    typeName: "Numerical",
    desc: "Độ tuổi của khách hàng (năm). Hỗ trợ phân tích hành vi duy trì số dư theo độ tuổi và nhóm khách hàng (Gen Z, Millennials, v.v.)."
  },
  {
    column: "Gender",
    type: "cat",
    typeName: "Categorical",
    desc: "Giới tính của khách hàng (<code>M</code> = Nam, <code>F</code> = Nữ)."
  },
  {
    column: "Months_on_book",
    type: "num",
    typeName: "Numerical",
    desc: "Thời gian thiết lập quan hệ giao dịch của khách hàng với NCB (tháng). Khách hàng thâm niên lâu năm thường có tính trung thành và số dư ổn định hơn."
  },
  {
    column: "CASA_Balance_Current",
    type: "num",
    typeName: "Numerical",
    desc: "Số dư bình quân trên tài khoản thanh toán CASA trong tháng hiện tại (VND). Chỉ số cốt lõi thể hiện quy mô nguồn vốn không kỳ hạn của khách hàng."
  },
  {
    column: "CASA_Balance_Prev_Q",
    type: "num",
    typeName: "Numerical",
    desc: "Số dư bình quân trên tài khoản thanh toán CASA trong quý trước (VND)."
  },
  {
    column: "CASA_Balance_Chng_Last_Prev_Q",
    type: "num",
    typeName: "Numerical",
    desc: "Tỷ lệ biến động số dư CASA bình quân của quý gần nhất so với quý trước đó (Last Quarter vs Previous Quarter). Tỷ lệ giảm mạnh (giá trị âm lớn) là dấu hiệu báo động rút ròng vốn."
  },
  {
    column: "Salary_Credit_Flag",
    type: "cat",
    typeName: "Categorical",
    desc: "Trạng thái nhận lương qua tài khoản NCB hàng tháng (<code>1</code> = Có phát sinh giao dịch ghi có lương chủ động, <code>0</code> = Không). Khách hàng nhận lương qua tài khoản có rủi ro churn rất thấp."
  },
  {
    column: "Total_Trans_Amt_12m",
    type: "num",
    typeName: "Numerical",
    desc: "Tổng giá trị tất cả giao dịch ghi nợ chủ động (chuyển khoản, rút tiền, thanh toán) thực hiện qua tài khoản CASA trong 12 tháng qua (VND)."
  },
  {
    column: "Total_Trans_Ct_12m",
    type: "num",
    typeName: "Numerical",
    desc: "Tổng số lần thực hiện giao dịch ghi nợ chủ động qua tài khoản CASA trong 12 tháng qua. Đo lường tần suất tương tác thực tế của khách hàng."
  },
  {
    column: "Trans_Ct_Chng_Last_Prev_Q",
    type: "num",
    typeName: "Numerical",
    desc: "Tỷ lệ biến động số lượng giao dịch quý gần nhất so với quý trước đó. Tần suất giao dịch sụt giảm nghiêm trọng là chỉ báo tiền-churn (đưa tài khoản vào trạng thái ngủ đông)."
  },
  {
    column: "Active_Ebanking_Flag",
    type: "cat",
    typeName: "Categorical",
    desc: "Trạng thái hoạt động trên ứng dụng NCB Smart Mobile Banking (<code>1</code> = Có phát sinh đăng nhập/giao dịch e-banking trong 30 ngày qua, <code>0</code> = Không hoạt động)."
  },
  {
    column: "Bill_Payment_Count_12m",
    type: "num",
    typeName: "Numerical",
    desc: "Tổng số lần thanh toán hóa đơn tự động (Auto-pay điện, nước, internet, truyền hình...) được ủy quyền trích nợ tự động từ tài khoản CASA trong 12 tháng qua."
  },
  {
    column: "Debit_Card_Spend_Amt_12m",
    type: "num",
    typeName: "Numerical",
    desc: "Tổng doanh số chi tiêu thanh toán qua thẻ ghi nợ (Debit Card) liên kết trực tiếp với tài khoản CASA trong 12 tháng qua (VND)."
  },
  {
    column: "Months_Inactive_12m",
    type: "num",
    typeName: "Numerical",
    desc: "Số tháng khách hàng không phát sinh bất kỳ giao dịch tài chính chủ động nào trên tài khoản CASA trong 12 tháng qua. Một trong những đặc trưng quan trọng nhất báo hiệu rủi ro ngủ đông."
  },
  {
    column: "Contacts_Count_12m",
    type: "num",
    typeName: "Numerical",
    desc: "Số lần khách hàng chủ động liên hệ phàn nàn, hỏi đáp hoặc yêu cầu hỗ trợ qua NCB Hotline hoặc Phòng giao dịch trong 12 tháng qua."
  },
  {
    column: "Saving_Balance",
    type: "num",
    typeName: "Numerical",
    desc: "Tổng số dư tiền gửi tiết kiệm có kỳ hạn hiện tại của khách hàng tại hệ thống NCB (VND). Thể hiện mức độ liên kết chéo về tài sản gửi."
  },
  {
    column: "Credit_Card_Active",
    type: "cat",
    typeName: "Categorical",
    desc: "Trạng thái có sử dụng thẻ tín dụngactive tại NCB hay không (<code>1</code> = Có thẻ active, <code>0</code> = Không). Khách hàng sử dụng đa dịch vụ thường có độ trung thành cao hơn."
  },
  {
    column: "Avg_Balance_12m",
    type: "num",
    typeName: "Numerical",
    desc: "Số dư tài khoản CASA bình quân tính chung trong suốt 12 tháng qua (VND)."
  },
  {
    column: "Overdraft_Limit",
    type: "num",
    typeName: "Numerical",
    desc: "Hạn mức thấu chi tài khoản thanh toán được NCB cấp duyệt cho khách hàng (VND)."
  }
];
