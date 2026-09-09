import { Youtube, BookOpen, Users, TrendingUp } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Sıralı Hikayeler",
      description: "84 hikaye birbirinin devamıdır. Her hikaye bir sonrakine hazırlar."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Seviye Bazlı Öğrenme",
      description: "Başlangıçtan ileri seviyeye kadar kademeli ilerleme."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Topluluk Destekli",
      description: "Diğer öğrencilerle etkileşim ve paylaşım imkanı."
    },
    {
      icon: <Youtube className="w-8 h-8" />,
      title: "YouTube Entegrasyonu",
      description: "Tüm hikayeler YouTube'da kolay erişilebilir."
    }
  ];

  const stats = [
    { number: "84", label: "Hikaye" },
    { number: "3", label: "Seviye" },
    { number: "1000+", label: "Kelime" },
    { number: "∞", label: "Öğrenme" }
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nasıl Çalışır?</h2>
          <p className="text-gray-600 text-lg">Eğlenceli ve etkili İngilizce öğrenme yöntemi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-primary-600 mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
