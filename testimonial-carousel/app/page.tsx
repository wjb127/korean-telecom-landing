import TestimonialCarousel from "@/components/testimonial-carousel"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-12">고객 후기</h1>
        <TestimonialCarousel />
      </div>
    </main>
  )
}
