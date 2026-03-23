import type { EnterEffect, SlideTransition } from "./animation-effects";

export interface SlideImage {
  src: string;
  caption: string;
  subcaption?: string;
  enterEffect: EnterEffect;
}

export interface SlideConfig {
  id: string;
  background: string;
  title: string;
  subtitle: string;
  description: string;
  images: SlideImage[];
  transition: SlideTransition;
}

// Thumbnail slot positions (where exited images land)
// Slots 0-2: left column, Slots 3-4: right column
export const THUMB_SLOTS = [
  { top: "12%", left: "30px", right: "auto" },
  { top: "33%", left: "30px", right: "auto" },
  { top: "54%", left: "30px", right: "auto" },
  { top: "12%", left: "auto", right: "30px" },
  { top: "33%", left: "auto", right: "30px" },
];

export const THUMB_WIDTH = 140;
export const THUMB_HEIGHT = 100;

export const slides: SlideConfig[] = [
  {
    id: "hanoi",
    background: "/images/story-1/ha-noi.jpg",
    title: "Hà Nội",
    subtitle: "Nơi câu chuyện bắt đầu",
    description:
      "Giữa những con phố cổ rêu phong, mùi cà phê trứng quyện trong gió sớm — tôi nhận ra hành trình ngàn dặm luôn khởi đầu từ một bước chân nhỏ bé.",
    transition: "fade",
    images: [
      { src: "/images/story-1/ha-noi.jpg", caption: "Phố Cổ Hà Nội", subcaption: "36 phố phường — nơi lịch sử ngủ say trong từng viên gạch", enterEffect: "zoomBurst" },
      { src: "/images/story-1/lantern-festival.jpg", caption: "Lễ Hội Đèn Lồng", subcaption: "Ánh sáng lung linh thắp lên hy vọng mỗi đêm trăng rằm", enterEffect: "flyUp" },
      { src: "/images/story-1/old-town.jpg", caption: "Phố Cổ Hội An", subcaption: "Thời gian ngừng trôi giữa những mái ngói rêu phong", enterEffect: "flipBook" },
      { src: "/images/story-1/night-city.jpg", caption: "Hà Nội Về Đêm", subcaption: "Thành phố không bao giờ ngủ, chỉ đổi giấc mơ", enterEffect: "circleReveal" },
      { src: "/images/story-1/rice-terrace.jpg", caption: "Ruộng Bậc Thang", subcaption: "Kiệt tác điêu khắc của bàn tay người nông dân", enterEffect: "elasticPop" },
    ],
  },
  {
    id: "cauvang",
    background: "/images/story-1/cau-vang.jpg",
    title: "Cầu Vàng",
    subtitle: "Bàn tay giữa mây trời",
    description:
      "Đôi bàn tay khổng lồ nâng niu cây cầu vàng giữa lưng chừng núi. Đứng ở đây, ta không còn biết mình đang chạm đất hay đang bước trên mây.",
    transition: "flipPage",
    images: [
      { src: "/images/story-1/cau-vang.jpg", caption: "Cầu Vàng Đà Nẵng", subcaption: "Kiến trúc kỳ vĩ giữa đỉnh Bà Nà Hills", enterEffect: "curtainReveal" },
      { src: "/images/story-1/cherry-blossom.jpg", caption: "Hoa Anh Đào", subcaption: "Mùa xuân khẽ chạm vào cánh hoa mong manh", enterEffect: "spinIn" },
      { src: "/images/story-1/misty-mountain.jpg", caption: "Núi Trong Sương", subcaption: "Thiên nhiên vẽ tranh bằng hơi nước và ánh sáng", enterEffect: "flyDown" },
      { src: "/images/story-1/boat-river.jpg", caption: "Thuyền Trên Sông", subcaption: "Dòng nước lặng lẽ kể chuyện ngàn năm", enterEffect: "diamondReveal" },
      { src: "/images/story-1/temple-fog.jpg", caption: "Đền Cổ Trong Sương", subcaption: "Linh thiêng hòa quyện cùng huyền bí", enterEffect: "slideLeft" },
    ],
  },
  {
    id: "halong",
    background: "/images/story-1/vinh-ha-long.jpg",
    title: "Vịnh Hạ Long",
    subtitle: "Di sản thiên nhiên thế giới",
    description:
      "Hàng nghìn đảo đá vôi nhô lên giữa mặt nước xanh ngọc. Mỗi hòn đảo là một bức tượng khổng lồ do thiên nhiên tạc nên qua triệu năm.",
    transition: "shutter",
    images: [
      { src: "/images/story-1/vinh-ha-long.jpg", caption: "Vịnh Hạ Long", subcaption: "Hàng nghìn hòn đảo trên mặt nước ngọc bích", enterEffect: "flyDown" },
      { src: "/images/story-1/cat-ba.jpg", caption: "Đảo Cát Bà", subcaption: "Viên ngọc xanh giữa lòng vịnh thiên đường", enterEffect: "elasticPop" },
      { src: "/images/story-1/sunset-ocean.jpg", caption: "Hoàng Hôn Trên Biển", subcaption: "Khi mặt trời hôn mặt nước — cả bầu trời bừng cháy", enterEffect: "circleReveal" },
      { src: "/images/story-1/mountain-lake.jpg", caption: "Hồ Trên Núi", subcaption: "Mặt nước phẳng lặng như tấm gương soi bầu trời", enterEffect: "flipBook" },
      { src: "/images/story-1/waterfall.jpg", caption: "Thác Nước", subcaption: "Âm thanh của tự do rơi xuống từ độ cao ngàn mét", enterEffect: "zoomBurst" },
    ],
  },
  {
    id: "final",
    background: "/images/story-1/suong-mu.jpg",
    title: "Sương Mù",
    subtitle: "Huyền bí giữa thiên nhiên",
    description:
      "Cuối hành trình, sương mù ôm lấy mọi thứ. Ranh giới giữa thực và mơ tan biến — chỉ còn lại cảm giác bình yên vô tận.",
    transition: "spiralOut",
    images: [
      { src: "/images/story-1/suong-mu.jpg", caption: "Sương Mù", subcaption: "Khi thiên nhiên khoác lên mình tấm áo huyền bí", enterEffect: "curtainReveal" },
      { src: "/images/story-1/bamboo-forest.jpg", caption: "Rừng Tre", subcaption: "Xanh mướt, thẳng tắp — bài học về sự kiên cường", enterEffect: "spinIn" },
      { src: "/images/story-1/nui-tuyet.jpg", caption: "Núi Tuyết", subcaption: "Trắng tinh khôi nơi đỉnh trời chạm mây", enterEffect: "flyUp" },
      { src: "/images/story-1/nhat-ban.jpg", caption: "Xứ Sở Phù Tang", subcaption: "Nơi truyền thống và hiện đại hòa quyện", enterEffect: "diamondReveal" },
      { src: "/images/story-1/thanh-pho-ho-chi-minh.jpg", caption: "Sài Gòn", subcaption: "Thành phố mang tên Bác — nhịp sống không ngừng nghỉ", enterEffect: "slideLeft" },
    ],
  },
];
