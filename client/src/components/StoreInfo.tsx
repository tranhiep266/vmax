import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";

export default function StoreInfo() {
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    console.log('Contact form submitted');
  };

  return (
    <section className="py-16 bg-primary-custom text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Store Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">Store Hours</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between" data-testid="hours-weekdays">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between" data-testid="hours-saturday">
                <span>Saturday:</span>
                <span>10:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between" data-testid="hours-sunday">
                <span>Sunday:</span>
                <span>12:00 PM - 5:00 PM</span>
              </div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center" data-testid="contact-address">
                <MapPin className="h-5 w-5 mr-3" />
                <span>123 Tech Street, Digital City, TC 12345</span>
              </div>
              <div className="flex items-center" data-testid="contact-phone">
                <Phone className="h-5 w-5 mr-3" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center" data-testid="contact-email">
                <Mail className="h-5 w-5 mr-3" />
                <span>info@techhub.com</span>
              </div>
            </div>
          </div>
          
          {/* Quick Contact Form */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Contact</h3>
            <form className="space-y-3" onSubmit={handleContactSubmit}>
              <Input 
                type="text" 
                placeholder="Your Name" 
                className="bg-primary-light border-gray-600 text-white placeholder-gray-400 focus:border-accent-custom"
                data-testid="input-contact-name"
              />
              <Input 
                type="email" 
                placeholder="Your Email" 
                className="bg-primary-light border-gray-600 text-white placeholder-gray-400 focus:border-accent-custom"
                data-testid="input-contact-email"
              />
              <Textarea 
                placeholder="Your Message" 
                rows={3} 
                className="bg-primary-light border-gray-600 text-white placeholder-gray-400 focus:border-accent-custom resize-none"
                data-testid="textarea-contact-message"
              />
              <Button 
                type="submit" 
                className="w-full bg-accent-custom hover:hover:bg-accent-hover text-white font-semibold"
                data-testid="button-send-message"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
