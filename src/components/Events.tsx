import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, MapPin, ExternalLink, ChevronRight } from 'lucide-react';

const events = [
  {
    title: "Sunday Main Service",
    time: "10:00 AM",
    day: "Every Sunday",
    location: "Main Sanctuary",
    category: "Worship",
    description: "Join us for our main worship service as we come together to praise God and receive His word.",
    color: "bg-jly-blue",
    icon: CalendarIcon
  },
  {
    title: "KingdomKids",
    time: "10:00 AM",
    day: "Every Sunday",
    location: "Children's Hall",
    category: "Discipleship",
    description: "A fun and engaging environment for children to learn about God's love and biblical values.",
    color: "bg-amber-500",
    icon: CalendarIcon
  },
  {
    title: "JLY Leadtakers Pro",
    time: "2:00 PM",
    day: "Every Sunday",
    location: "Upper Room",
    category: "Leadership",
    description: "Professional and young adult leadership training focused on the 7 mountains of society.",
    color: "bg-jly-red",
    icon: CalendarIcon
  },
  {
    title: "JLY Leadtakers Youth",
    time: "2:00 PM",
    day: "Every Sunday",
    location: "Youth Center",
    category: "Youth",
    description: "Empowering the next generation of leaders through dynamic discipleship and fellowship.",
    color: "bg-blue-600",
    icon: CalendarIcon
  }
];

export default function Events() {
  return (
    <section id="events" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-jly-red font-bold tracking-widest text-sm mb-2 uppercase">Upcoming Schedule</h2>
            <h3 className="text-4xl md:text-5xl font-black text-jly-blue mb-6">
              CHURCH CALENDAR
            </h3>
            <p className="text-gray-600 text-lg">
              Join us in our weekly services and specialized programs designed to help you grow in faith and leadership.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-jly-red font-bold hover:underline"
          >
            View Full Calendar <ChevronRight size={20} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-gray-50 rounded-2xl overflow-hidden flex flex-col sm:flex-row border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className={`sm:w-48 ${event.color} p-8 flex flex-col items-center justify-center text-white text-center`}>
                <span className="text-sm font-bold tracking-widest uppercase opacity-80 mb-2">{event.day.split(' ')[1]}</span>
                <span className="text-4xl font-black mb-1">SUN</span>
                <div className="w-10 h-1 bg-white/30 my-4 rounded-full"></div>
                <Clock size={24} className="mb-2" />
                <span className="font-bold">{event.time}</span>
              </div>
              
              <div className="flex-1 p-8">
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
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 py-3 px-6 rounded-xl font-bold text-white shadow-lg transition-all ${event.color} hover:brightness-110 flex items-center justify-center gap-2`}
                  >
                    Register Now <ExternalLink size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-3 px-6 rounded-xl font-bold text-jly-blue border-2 border-gray-200 hover:border-jly-blue transition-all"
                  >
                    Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
