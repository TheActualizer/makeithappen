const VideoSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Our Approach
        </h2>
        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-accent/20">
          <iframe
            src="https://www.youtube.com/embed/eXlqLTSWMv4"
            title="MakeITHappen Approach"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;