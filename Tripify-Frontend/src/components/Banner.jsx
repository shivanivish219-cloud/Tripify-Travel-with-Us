// Same 5-slide CSS-animation carousel as the original — implemented
// declaratively here so the slide list can grow without touching CSS.
const slides = [
  "https://thumbs.dreamstime.com/b/ready-summer-vacation-travel-background-d-rendering-114574299.jpg",
  "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80",
];

export default function Banner() {
  return (
    <section className="middle-box">
      <div className="banner-slider">
        <div className="slides">
          {slides.map((src, i) => (
            <img key={i} src={src} alt="" />
          ))}
        </div>
      </div>
      <h1>Explore the World</h1>
      <p>Travel to the beautiful destination with US</p>
      <p>Ayee hoto tassali se ghum kr jana...</p>
    </section>
  );
}
