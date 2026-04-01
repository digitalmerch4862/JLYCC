import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import VisionSummary from './components/Programs';
import Events from './components/Events';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Leadership from './components/Leadership';
import Support from './components/Support';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SEO from './components/SEO';
import Login from './components/Login';
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './components/Admin/Dashboard';
import SectionForm from './components/Admin/SectionForm';
import Admins from './components/Admin/Admins';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-jly-red selection:text-white">
      <SEO />
      <Header />
      <main>
        <Hero />
        <About />
        <VisionSummary />
        <Events />
        <WhyChooseUs />
        <Gallery />
        <Leadership />
        <Support />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/settings" element={<AdminLayout><Admins /></AdminLayout>} />
        
        {/* Section Routes */}
        <Route path="/admin/hero" element={
          <AdminLayout>
            <SectionForm 
              sectionId="hero" 
              title="Hero Section" 
              description="Manage the main landing page headline and background."
              fields={[
                { name: 'welcomeText', label: 'Welcome Text', type: 'text', placeholder: 'Welcome to JLYCC' },
                { name: 'headline', label: 'Main Headline', type: 'textarea', placeholder: 'JESUS LOVES YOU CITY CHURCH' },
                { name: 'subheadline', label: 'Subheadline', type: 'text', placeholder: 'Where Generals Are Made' },
                { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Raising leaders for Kingdom impact since 1983.' },
                { name: 'bgImage', label: 'Background Image URL', type: 'url' },
              ]}
            />
          </AdminLayout>
        } />

        <Route path="/admin/vision" element={
          <AdminLayout>
            <SectionForm 
              sectionId="vision" 
              title="Vision & Mission" 
              description="Update the ministry's core purpose and values."
              fields={[
                { name: 'visionTitle', label: 'Vision Title', type: 'text' },
                { name: 'visionText', label: 'Vision Statement', type: 'textarea' },
                { name: 'missionTitle', label: 'Mission Title', type: 'text' },
                { name: 'missionText', label: 'Mission Statement', type: 'textarea' },
              ]}
            />
          </AdminLayout>
        } />

        <Route path="/admin/events" element={
          <AdminLayout>
            <SectionForm 
              sectionId="events" 
              title="Events Section" 
              description="Manage upcoming church events and schedules."
              fields={[
                { name: 'title', label: 'Section Title', type: 'text' },
                { name: 'subtitle', label: 'Section Subtitle', type: 'text' },
                { name: 'event1_title', label: 'Event 1 Title', type: 'text' },
                { name: 'event1_date', label: 'Event 1 Date', type: 'text' },
                { name: 'event2_title', label: 'Event 2 Title', type: 'text' },
                { name: 'event2_date', label: 'Event 2 Date', type: 'text' },
              ]}
            />
          </AdminLayout>
        } />

        <Route path="/admin/leadership" element={
          <AdminLayout>
            <SectionForm 
              sectionId="leadership" 
              title="Leadership" 
              description="Update the names and images of the ministry leaders."
              fields={[
                { name: 'leader1_name', label: 'Leader 1 Name', type: 'text' },
                { name: 'leader1_image', label: 'Leader 1 Image URL', type: 'url' },
                { name: 'leader2_name', label: 'Leader 2 Name', type: 'text' },
                { name: 'leader2_image', label: 'Leader 2 Image URL', type: 'url' },
                { name: 'leader3_name', label: 'Leader 3 Name', type: 'text' },
                { name: 'leader3_image', label: 'Leader 3 Image URL', type: 'url' },
              ]}
            />
          </AdminLayout>
        } />

        <Route path="/admin/gallery" element={
          <AdminLayout>
            <SectionForm 
              sectionId="gallery" 
              title="Gallery" 
              description="Manage the 3D Photo Album images."
              fields={[
                { name: 'title', label: 'Title', type: 'text' },
                { name: 'subtitle', label: 'Subtitle', type: 'text' },
                { name: 'description', label: 'Description', type: 'textarea' },
                { name: 'image1', label: 'Image 1 URL', type: 'url' },
                { name: 'image2', label: 'Image 2 URL', type: 'url' },
                { name: 'image3', label: 'Image 3 URL', type: 'url' },
                { name: 'image4', label: 'Image 4 URL', type: 'url' },
                { name: 'image5', label: 'Image 5 URL', type: 'url' },
                { name: 'image6', label: 'Image 6 URL', type: 'url' },
              ]}
            />
          </AdminLayout>
        } />

        <Route path="/admin/about" element={
          <AdminLayout>
            <SectionForm 
              sectionId="about" 
              title="About Section" 
              description="Update the ministry's history and core values."
              fields={[
                { name: 'title', label: 'Title', type: 'text' },
                { name: 'subtitle', label: 'Subtitle', type: 'text' },
                { name: 'description', label: 'Description', type: 'textarea' },
                { name: 'secondaryDescription', label: 'Secondary Description', type: 'textarea' },
                { name: 'videoUrl', label: 'YouTube Embed URL', type: 'url' },
                { name: 'establishedYear', label: 'Established Year', type: 'text' },
                { name: 'secRegNo', label: 'SEC Reg No', type: 'text' },
                { name: 'youtubeChannelUrl', label: 'YouTube Channel URL', type: 'url' },
              ]}
            />
          </AdminLayout>
        } />

        <Route path="/admin/why-us" element={
          <AdminLayout>
            <SectionForm 
              sectionId="why_us" 
              title="Why Choose Us" 
              description="Manage the JLY difference section."
              fields={[
                { name: 'title', label: 'Title', type: 'text' },
                { name: 'subtitle', label: 'Subtitle', type: 'text' },
                { name: 'description', label: 'Description', type: 'textarea' },
                { name: 'imageUrl', label: 'Image URL', type: 'url' },
                { name: 'quote', label: 'Quote', type: 'text' },
                { name: 'quoteAuthor', label: 'Quote Author', type: 'text' },
              ]}
            />
          </AdminLayout>
        } />

        <Route path="/admin/testimonials" element={
          <AdminLayout>
            <SectionForm 
              sectionId="testimonials" 
              title="Testimonials" 
              description="Manage student and pastor testimonies."
              fields={[
                { name: 'title', label: 'Title', type: 'text' },
                { name: 'subtitle', label: 'Subtitle', type: 'text' },
              ]}
            />
          </AdminLayout>
        } />

        <Route path="/admin/support" element={
          <AdminLayout>
            <SectionForm 
              sectionId="support" 
              title="Support Section" 
              description="Update the support and donation information."
              fields={[
                { name: 'title', label: 'Title', type: 'text' },
                { name: 'subtitle', label: 'Subtitle', type: 'text' },
                { name: 'description', label: 'Description', type: 'textarea' },
                { name: 'secRegNo', label: 'SEC Reg No', type: 'text' },
              ]}
            />
          </AdminLayout>
        } />

        <Route path="/admin/contact" element={
          <AdminLayout>
            <SectionForm 
              sectionId="contact" 
              title="Contact Section" 
              description="Update contact details and location."
              fields={[
                { name: 'title', label: 'Title', type: 'text' },
                { name: 'subtitle', label: 'Subtitle', type: 'text' },
                { name: 'description', label: 'Description', type: 'textarea' },
                { name: 'location', label: 'Location Name', type: 'text' },
                { name: 'locationUrl', label: 'Google Maps URL', type: 'url' },
                { name: 'phone', label: 'Phone Number', type: 'text' },
                { name: 'emailPrimary', label: 'Primary Email', type: 'text' },
                { name: 'emailSecondary', label: 'Secondary Email', type: 'text' },
                { name: 'mapEmbedUrl', label: 'Map Embed URL', type: 'url' },
              ]}
            />
          </AdminLayout>
        } />

        <Route path="/admin/cta" element={
          <AdminLayout>
            <SectionForm 
              sectionId="cta" 
              title="CTA Section" 
              description="Update the call to action at the bottom."
              fields={[
                { name: 'headline', label: 'Headline', type: 'text' },
                { name: 'subheadline', label: 'Subheadline', type: 'text' },
                { name: 'buttonText', label: 'Button Text', type: 'text' },
                { name: 'buttonLink', label: 'Button Link', type: 'text' },
              ]}
            />
          </AdminLayout>
        } />

        <Route path="/admin/header" element={
          <AdminLayout>
            <SectionForm 
              sectionId="header" 
              title="Header" 
              description="Update the logo and navigation settings."
              fields={[
                { name: 'logoUrl', label: 'Logo URL', type: 'url' },
                { name: 'churchName', label: 'Church Name', type: 'text' },
                { name: 'tagline', label: 'Tagline', type: 'text' },
                { name: 'liveMessage', label: 'Live Banner Message', type: 'text' },
                { name: 'youtubeUrl', label: 'YouTube Channel URL', type: 'url' },
                { name: 'donateButtonText', label: 'Donate Button Text', type: 'text' },
                { name: 'donateButtonLink', label: 'Donate Button Link', type: 'text' },
                { name: 'connectButtonText', label: 'Connect Button Text', type: 'text' },
                { name: 'connectButtonLink', label: 'Connect Button Link', type: 'text' },
              ]}
            />
          </AdminLayout>
        } />

        <Route path="/admin/footer" element={
          <AdminLayout>
            <SectionForm 
              sectionId="footer" 
              title="Footer" 
              description="Update the footer information."
              fields={[
                { name: 'logoUrl', label: 'Logo URL', type: 'url' },
                { name: 'churchName', label: 'Church Name', type: 'text' },
                { name: 'tagline', label: 'Tagline', type: 'textarea' },
                { name: 'facebookUrl', label: 'Facebook URL', type: 'url' },
                { name: 'youtubeUrl', label: 'YouTube URL', type: 'url' },
                { name: 'secRegNo', label: 'SEC Reg No', type: 'text' },
                { name: 'websiteUrl', label: 'Website URL', type: 'url' },
              ]}
            />
          </AdminLayout>
        } />
      </Routes>
    </Router>
  );
}
