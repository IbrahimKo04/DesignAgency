import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User, Mail, MessageSquare, CheckCircle } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// --- Supabase Client (Unchanged) ---
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true },
};

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // --- CHANGE 1: Table name changed to 'Responses' ---
      const { error } = await supabase.from('Responses').insert([
        // --- CHANGE 2: Object key changed to 'query' ---
        { name: data.name, email: data.email, query: data.query }
      ]);

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-secondary/30 relative overflow-hidden z-10">
      {/* ... (background blurs) ... */}

      <div className="container mx-auto relative z-10">
        {/* ... (header) ... */}
        <motion.div
          className="text-center mb-16"
          initial={fadeIn.initial}
          whileInView={fadeIn.whileInView}
          transition={fadeIn.transition}
          viewport={fadeIn.viewport}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Get in <span className="bg-gradient-primary bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? Send us a message.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={fadeIn.initial}
          whileInView={fadeIn.whileInView}
          transition={{ ...fadeIn.transition, delay: 0.2 }}
          viewport={fadeIn.viewport}
        >
          <Card className="max-w-2xl mx-auto bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-10">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">Your message has been saved.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field (Unchanged) */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input id="name" name="name" placeholder="Your Name" required className="pl-10" />
                    </div>
                  </div>
                  {/* Email Field (Unchanged) */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input id="email" name="email" type="email" placeholder="your@email.com" required className="pl-10" />
                    </div>
                  </div>

                  {/* --- CHANGE 3: "Message" field updated to "query" --- */}
                  <div className="space-y-2">
                    <Label htmlFor="query">Message</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Textarea id="query" name="query" placeholder="Your project details..." required className="pl-10 pt-2 min-h-[100px]" />
                    </div>
                  </div>
                  {/* --------------------------------------------------- */}

                  {/* Submit Button (Unchanged) */}
                  <Button type="submit" className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-500 text-lg" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                  {error && (
                    <p className="text-center text-red-500">{error}</p>
                  )}
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};