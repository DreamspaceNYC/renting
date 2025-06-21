import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Property, ContactFormData } from "@/lib/types";

interface ContactModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ property, isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: `I'm interested in the property at ${property.address}. Please contact me with more information.`
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const submitInquiry = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", `/api/properties/${property.id}/inquiries`, data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Your inquiry has been sent successfully. We'll get back to you soon.",
      });
      onClose();
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      queryClient.invalidateQueries({ queryKey: ['/api/properties', property.id] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    submitInquiry.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Contact About This Property</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="mt-1"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="mt-1"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="message" className="text-sm font-medium text-gray-700">
              Message *
            </Label>
            <Textarea
              id="message"
              rows={3}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className="mt-1"
              required
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-primary text-white hover:bg-primary-dark transition-colors"
            disabled={submitInquiry.isPending}
          >
            {submitInquiry.isPending ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
