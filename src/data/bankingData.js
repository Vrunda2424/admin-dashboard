// Dummy data for the two banking channels. Each channel has its own cards, charts, and user table.
export const banking = {
  internet: {
    name: "Internet Banking",
    subtitle: "Web banking activity across the bank's online portal.",
    cards: [
      { label: "Active sessions", value: "1,284" },
      { label: "Transactions today", value: "3,962" },
      { label: "Failed logins", value: "87" },
      { label: "Average session time", value: "8m 24s" },
    ],
    trend: {
      title: "Monthly logins",
      type: "line",
      seriesName: "Logins",
      data: [["Jan", 4200], ["Feb", 4600], ["Mar", 5100], ["Apr", 4900], ["May", 5600], ["Jun", 6100], ["Jul", 6400], ["Aug", 6900], ["Sep", 7300], ["Oct", 7800]].map(([label, value]) => ({ label, value })),
    },
    split: {
      title: "Login results",
      donut: true,
      data: [{ name: "Success", value: 92 }, { name: "Failed", value: 5 }, { name: "Locked", value: 3 }],
    },
    bar: {
      title: "Transactions by type",
      seriesName: "Transactions",
      data: [["Fund transfer", 1450], ["Bill payment", 980], ["Statements", 720], ["Cheque request", 340], ["Loan enquiry", 472]].map(([label, value]) => ({ label, value })),
    },
    columns: [
      { key: "customerId", label: "Customer ID" },
      { key: "name", label: "Name" },
      { key: "accountType", label: "Account type" },
      { key: "lastLogin", label: "Last login" },
      { key: "status", label: "Status" },
    ],
    users: [
      { id: 1, customerId: "IB-10021", name: "Anita Verma", accountType: "Savings", lastLogin: "26 Oct 2026, 10:42 am", status: "Active" },
      { id: 2, customerId: "IB-10034", name: "Rahul Mehta", accountType: "Current", lastLogin: "26 Oct 2026, 9:15 am", status: "Active" },
      { id: 3, customerId: "IB-10047", name: "Sunita Rao", accountType: "Savings", lastLogin: "24 Oct 2026, 6:30 pm", status: "Inactive" },
      { id: 4, customerId: "IB-10052", name: "Vikash Kumar", accountType: "Salary", lastLogin: "25 Oct 2026, 2:05 pm", status: "Active" },
      { id: 5, customerId: "IB-10068", name: "Deepa Nair", accountType: "Current", lastLogin: "21 Oct 2026, 11:50 am", status: "Inactive" },
      { id: 6, customerId: "IB-10073", name: "Manoj Pillai", accountType: "Savings", lastLogin: "26 Oct 2026, 8:20 am", status: "Active" },
      { id: 7, customerId: "IB-10089", name: "Farah Khan", accountType: "Salary", lastLogin: "25 Oct 2026, 7:45 pm", status: "Active" },
      { id: 8, customerId: "IB-10095", name: "Girish Shetty", accountType: "Current", lastLogin: "19 Oct 2026, 4:10 pm", status: "Inactive" },
    ],
  },
  mobile: {
    name: "Mobile Banking",
    subtitle: "App usage and payments from the bank's mobile app.",
    cards: [
      { label: "App installs", value: "48,210" },
      { label: "Active devices", value: "22,730" },
      { label: "Mobile payments", value: "9,846" },
      { label: "Crash rate", value: "0.8%" },
    ],
    trend: {
      title: "Daily active devices (last 7 days)",
      type: "area",
      seriesName: "Devices",
      data: [["Mon", 18200], ["Tue", 19100], ["Wed", 20400], ["Thu", 19800], ["Fri", 22300], ["Sat", 24100], ["Sun", 22730]].map(([label, value]) => ({ label, value })),
    },
    split: {
      title: "Platform share (%)",
      donut: false,
      data: [{ name: "Android", value: 68 }, { name: "iOS", value: 29 }, { name: "Other", value: 3 }],
    },
    bar: {
      title: "Payments by method",
      seriesName: "Payments",
      data: [["UPI", 5400], ["QR code", 2100], ["Wallet", 1300], ["Card", 1046]].map(([label, value]) => ({ label, value })),
    },
    columns: [
      { key: "userId", label: "User ID" },
      { key: "name", label: "Name" },
      { key: "device", label: "Device" },
      { key: "appVersion", label: "App version" },
      { key: "status", label: "Status" },
    ],
    users: [
      { id: 1, userId: "MB-5001", name: "Kavya Iyer", device: "Pixel 8 (Android 15)", appVersion: "4.2.1", status: "Active" },
      { id: 2, userId: "MB-5014", name: "Arjun Desai", device: "iPhone 15 (iOS 18)", appVersion: "4.2.1", status: "Active" },
      { id: 3, userId: "MB-5022", name: "Nisha Patel", device: "Galaxy S23 (Android 14)", appVersion: "4.1.7", status: "Inactive" },
      { id: 4, userId: "MB-5037", name: "Sameer Joshi", device: "OnePlus 12 (Android 15)", appVersion: "4.2.0", status: "Active" },
      { id: 5, userId: "MB-5043", name: "Lakshmi Menon", device: "iPhone 13 (iOS 17)", appVersion: "4.0.9", status: "Inactive" },
      { id: 6, userId: "MB-5058", name: "Tarun Bhatt", device: "Redmi Note 13 (Android 14)", appVersion: "4.2.1", status: "Active" },
      { id: 7, userId: "MB-5066", name: "Ishita Roy", device: "iPhone 14 (iOS 18)", appVersion: "4.2.0", status: "Active" },
      { id: 8, userId: "MB-5071", name: "Harish Gowda", device: "Galaxy A54 (Android 13)", appVersion: "3.9.5", status: "Inactive" },
    ],
  },
};
