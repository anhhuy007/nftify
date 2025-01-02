import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Danh sách 5 màu fallback
const fallbackColors = ["#96391d", "#3363a6", "#3eb06f", "#e38827", "#64289c"]; // Đỏ, xanh da trời, xanh ngọc, cam, tím đậm

export default function CollectionCard({ collection }) {
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");

  useEffect(() => {
    const img = new Image();
    img.src = collection.thumbUrl;
    img.crossOrigin = "anonymous"; 
    img.onload = () => {
      try {
        // Tạo canvas để trích xuất màu từ ảnh
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;

        // Vẽ ảnh lên canvas
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Lấy dữ liệu pixel
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const pixels = imageData.data;
        let r = 0,
          g = 0,
          b = 0,
          count = 0;

        // Tính trung bình màu
        for (let i = 0; i < pixels.length; i += 4) {
          r += pixels[i]; 
          g += pixels[i + 1]; 
          b += pixels[i + 2]; 
          count++;
        }

        // Nếu không có pixel nào, sử dụng màu fallback
        if (count === 0) throw new Error("No pixels found");

        // Chuyển đổi thành màu RGB
        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);
        setBackgroundColor(`rgb(${r}, ${g}, ${b})`);
      } catch (error) {
        // Nếu lỗi, chọn màu ngẫu nhiên từ danh sách fallback
        const randomIndex = Math.floor(Math.random() * fallbackColors.length);
        setBackgroundColor(fallbackColors[randomIndex]);
      }
    };

    // Nếu ảnh không tải được, chọn màu ngẫu nhiên
    img.onerror = () => {
      const randomIndex = Math.floor(Math.random() * fallbackColors.length);
      setBackgroundColor(fallbackColors[randomIndex]);
    };
  }, [collection.thumbUrl]);

  return (
    <Card
      className="w-full overflow-hidden text-white rounded-3xl"
      style={{ backgroundColor }} 
    >
      <Link to={`/collection/${collection._id}`}>
        <CardContent className="p-0">
          <div className="flex items-center justify-between flex-col-reverse gap-5 md:flex-row md:gap-20 p-8">
            <div className="space-y-6 md:max-w-[280px] lg:max-w-[300px] xl:max-w-[500px]">
              <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold mx-auto">
                {collection.name}
              </h2>
              <p className="text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                {collection.description}
              </p>
              <div className="space-y-2">
                <p className="text-base md:text-lg lg:text-xl xl:text-2xl">
                  Visit
                </p>
                <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
                  {collection.viewCount}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center flex-1 max-w-[250px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[500px]">
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-gradient-to-t from-[#F15A24] to-black opacity-50 rounded-xl" />
                <img
                  src={collection.thumbUrl}
                  alt="Thumbnail"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
