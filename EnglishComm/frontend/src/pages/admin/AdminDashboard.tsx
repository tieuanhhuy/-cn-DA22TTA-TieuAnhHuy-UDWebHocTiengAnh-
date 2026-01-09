import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  // 1. Khai báo biến (State) để lưu danh sách chủ đề
  const [topics, setTopics] = useState<any[]>([]);

  // 2. Hàm lấy danh sách chủ đề từ API khi trang vừa tải
  useEffect(() => {
    fetch("http://localhost:5000/api/vocabulary/topics") // Hoặc API admin tương ứng của bạn
      .then((res) => res.json())
      .then((data) => setTopics(data))
      .catch((err) => console.error("Lỗi tải topics:", err));
  }, []);

  // 3. Hàm xử lý xóa chủ đề
  const deleteTopic = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa chủ đề này không?")) return;

    try {
      // Gọi API xóa (đường dẫn này phải khớp với route backend bạn đã viết)
      const res = await fetch(`http://localhost:5000/api/admin/vocabulary/topic/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Nếu cần token thì thêm: Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });

      if (res.ok) {
        alert("Đã xóa thành công!");
        // Cập nhật lại giao diện bằng cách lọc bỏ topic vừa xóa
        setTopics(topics.filter((t) => t.id !== id));
      } else {
        alert("Lỗi khi xóa!");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi kết nối server!");
    }
  };

  // 4. Phần giao diện (đã có của bạn)
  return (
    <ul className="space-y-3">
      {topics.map((t: any) => (
        <li
          key={t.id}
          className="flex justify-between items-center bg-white p-4 rounded shadow"
        >
          {/* CLICK VÀO ĐÂY ĐỂ VÀO TRANG CHI TIẾT TỪ VỰNG CỦA CHỦ ĐỀ */}
          <Link
            to={`/admin/vocabulary/${t.id}`}
            className="font-medium text-blue-600 hover:underline"
          >
            {t.title}
          </Link>

          <button
            onClick={() => deleteTopic(t.id)}
            className="text-red-500 hover:text-red-700 font-bold"
          >
            Xóa
          </button>
        </li>
      ))}
    </ul>
  );
}