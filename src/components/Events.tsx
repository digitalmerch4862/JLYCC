import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, MapPin, ExternalLink, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';

export default function Events() {
  const defaultData = {
    title: 'Upcoming Schedule',
    subtitle: 'CHURCH CALENDAR',
    description: 'Join us in our weekly services and specialized programs designed to help you grow in faith and leadership.',
    events: [
      {
        title: "Sunday Main Service",
        time: "10:00 AM",
        day: "Every Sunday",
        location: "Main Sanctuary",
        category: "Worship",
        description: "Join us for our main worship service as we come together to praise God and receive His word.",
        color: "bg-jly-blue",
        facebookUrl: "https://www.facebook.com/JLYMain/"
      },
      {
        title: "KingdomKids",
        time: "10:00 AM",
        day: "Every Sunday",
        location: "2nd Floor",
        category: "Discipleship",
        description: "A fun and engaging environment for children to learn about God's love and biblical values.",
        color: "bg-amber-500",
        bgImage: "https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-1/433697330_719819573694082_970682339187809206_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=48ZRYUK83K0Q7kNvwGXNU4p&_nc_oc=Adp3nGDjP3WdRq1r8gtCoHlwUTCuiGjNanDN1c4Zc-1Uhk33n01qiizh5GaAVjElT_c&_nc_zt=24&_nc_ht=scontent-man2-1.xx&_nc_gid=vaLHswzXi0G9BMAIJPcJCw&_nc_ss=7a3a8&oh=00_Af2PAh3RWfOdG_L8HE8KtolU4AFKCwVintaWXOXBJMAAWA&oe=69D316BA",
        facebookUrl: "https://www.facebook.com/JLYCCKingdomKids/"
      },
      {
        title: "JLY Leadtakers Pro",
        time: "2:00 PM",
        day: "Every Sunday",
        location: "2nd Floor",
        category: "Leadership",
        description: "Professional and young adult leadership training focused on the 7 mountains of society.",
        color: "bg-jly-red",
        bgImage: "https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-1/622136095_122267424572192069_617608999485802270_n.jpg?stp=c0.5.477.477a_dst-jpg_s200x200_tt6&_nc_cat=106&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=PKsB-wxvQmsQ7kNvwFuh5lS&_nc_oc=AdqJ10-7oY8AfsccZGEENncES4dsk5y7iHczs0zdD3ThiAsvEoaDbCbqoyUGk3y3FjQ&_nc_zt=24&_nc_ht=scontent-man2-1.xx&_nc_gid=nH1ICfYfhameZRcs-KcJjw&_nc_ss=7a3a8&oh=00_Af22qRA8DxAJnIGHUOaKzxox7LP2gqXhndhuniuIcijhAg&oe=69D2F630",
        facebookUrl: "https://www.facebook.com/LeadtakersWC"
      },
      {
        title: "JLY Leadtakers Youth",
        time: "2:00 PM",
        day: "Every Sunday",
        location: "3rd Floor",
        category: "Youth",
        description: "Empowering the next generation of leaders through dynamic discipleship and fellowship.",
        color: "bg-blue-600",
        bgImage: "https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-1/309099764_158181883526259_8634066233004912702_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=vbClV7jULn8Q7kNvwEELbKY&_nc_oc=AdonFvwPcXwhukH8bqzLojSZgKZ8eX7tvQ4Oj72yj1G7CPmturpfkCPFcMBWnRMnSWY&_nc_zt=24&_nc_ht=scontent-man2-1.xx&_nc_gid=NkvLy0-5n6MeiMOBhDvPRQ&_nc_ss=7a3a8&oh=00_Af3NO8E9OieHgaI5bxoGk2YcdQpwMAdC-EGoD_6GcgoJkg&oe=69D30F68",
        facebookUrl: "https://www.facebook.com/leadtakersmain"
      }
    ]
  };

  const { content: firestoreContent } = useContent('events', defaultData);
  
  // Merge Firestore content with default data to ensure new fields are present
  const content = {
    ...defaultData,
    ...firestoreContent,
    events: defaultData.events.map((defaultEvent, idx) => ({
      ...defaultEvent,
      ...(firestoreContent?.events?.[idx] || {})
    }))
  };

  return (
    <section id="events" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-jly-red font-bold tracking-widest text-sm mb-2 uppercase">{content.title}</h2>
            <h3 className="text-4xl md:text-5xl font-black text-jly-blue mb-6 uppercase">
              {content.subtitle}
            </h3>
            <p className="text-gray-600 text-lg">
              {content.description}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-jly-red font-bold hover:underline uppercase tracking-widest text-xs"
          >
            View Full Calendar <ChevronRight size={20} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {content.events.map((event: any, index: number) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-gray-50 rounded-2xl overflow-hidden flex flex-col sm:flex-row border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className={`sm:w-48 ${event.color} p-8 flex flex-col items-center justify-center text-white text-center`}>
                <span className="text-sm font-bold tracking-widest uppercase opacity-80 mb-2">{event.day.split(' ')[1] || 'SUN'}</span>
                <span className="text-4xl font-black mb-1">SUN</span>
                <div className="w-10 h-1 bg-white/30 my-4 rounded-full"></div>
                <Clock size={24} className="mb-2" />
                <span className="font-bold">{event.time}</span>
              </div>
              
              <div className="flex-1 p-8 relative overflow-hidden">
                {event.bgImage && (
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={event.bgImage} 
                      alt="" 
                      className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-transparent" />
                  </div>
                )}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white ${event.color}`}>
                      {event.category}
                    </span>
                  </div>
                  <h4 className="text-2xl font-black text-jly-blue mb-3 group-hover:text-jly-red transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-500 font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-jly-red" />
                      {event.location}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Link
                      to="/login"
                      className={`flex-1 py-3 px-6 rounded-xl font-bold text-white shadow-lg transition-all ${event.color} hover:brightness-110 flex items-center justify-center gap-2 uppercase tracking-widest text-xs`}
                    >
                      Register Now <ExternalLink size={16} />
                    </Link>
                    {event.facebookUrl && (
                      <motion.a
                        href={event.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="py-3 px-6 rounded-xl font-bold text-jly-blue border-2 border-gray-200 hover:border-jly-blue transition-all uppercase tracking-widest text-xs flex items-center gap-2"
                      >
                        Details <ExternalLink size={14} />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
