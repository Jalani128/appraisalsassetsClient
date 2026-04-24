"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Globe, MapPin, Phone, Mail, Clock, Share2 } from "lucide-react";

type TabId = "hero" | "about" | "contact";

const TABS: { id: TabId; label: string }[] = [
  { id: "hero", label: "Hero Section" },
  { id: "about", label: "About Us" },
  { id: "contact", label: "Contact Info" },
];

export default function ContentManagementPage() {
  const [activeTab, setActiveTab] = useState<TabId>("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [hero, setHero] = useState({
    badgeText: "",
    headline: "",
    description: "",
  });

  const [about, setAbout] = useState({
    headline: "",
    description: "",
    mission: "",
    vision: "",
  });

  const [contact, setContact] = useState({
    officeAddress: "",
    phone: "",
    email: "",
    whatsapp: "",
    officeHours: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      youtube: "",
    },
    mapEmbedUrl: "",
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await api.getSiteContent();
      if (response.success && response.data) {
        const d = response.data;
        if (d.hero) {
          setHero({
            badgeText: d.hero.badgeText || "",
            headline: d.hero.headline || "",
            description: d.hero.description || "",
          });
        }
        if (d.about) {
          setAbout({
            headline: d.about.headline || "",
            description: d.about.description || "",
            mission: d.about.mission || "",
            vision: d.about.vision || "",
          });
        }
        if (d.contact) {
          setContact({
            officeAddress: d.contact.officeAddress || "",
            phone: d.contact.phone || "",
            email: d.contact.email || "",
            whatsapp: d.contact.whatsapp || "",
            officeHours: d.contact.officeHours || "",
            socialLinks: {
              facebook: d.contact.socialLinks?.facebook || "",
              instagram: d.contact.socialLinks?.instagram || "",
              linkedin: d.contact.socialLinks?.linkedin || "",
              twitter: d.contact.socialLinks?.twitter || "",
              youtube: d.contact.socialLinks?.youtube || "",
            },
            mapEmbedUrl: d.contact.mapEmbedUrl || "",
          });
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveHero = async () => {
    setSaving(true);
    try {
      const response = await api.updateHeroContent(hero);
      if (response.success) {
        toast.success("Hero section updated successfully");
      } else {
        toast.error(response.message || "Failed to update");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAbout = async () => {
    setSaving(true);
    try {
      const response = await api.updateAboutContent(about);
      if (response.success) {
        toast.success("About section updated successfully");
      } else {
        toast.error(response.message || "Failed to update");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveContact = async () => {
    setSaving(true);
    try {
      const response = await api.updateContactContent(contact);
      if (response.success) {
        toast.success("Contact info updated successfully");
      } else {
        toast.error(response.message || "Failed to update");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-slate-500">Loading content...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Content Management
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 mb-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? "text-slate-900"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C1A06E]" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-b-xl rounded-tr-xl border border-slate-100 border-t-0 shadow-sm">
        {/* ─── HERO SECTION TAB ─── */}
        {activeTab === "hero" && (
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#C1A06E]/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#C1A06E]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Hero Section Content
                </h2>
                <p className="text-sm text-slate-500">
                  Main banner shown on the homepage
                </p>
              </div>
            </div>

            <div className="space-y-5 max-w-2xl">
              <div className="space-y-2">
                <Label className="font-medium">Badge Text</Label>
                <Input
                  value={hero.badgeText}
                  onChange={(e) =>
                    setHero((prev) => ({ ...prev, badgeText: e.target.value }))
                  }
                  placeholder="e.g. RERA Certified | Trusted Since 2010"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-medium">Main Headline</Label>
                <Input
                  value={hero.headline}
                  onChange={(e) =>
                    setHero((prev) => ({ ...prev, headline: e.target.value }))
                  }
                  placeholder="e.g. Trusted Real Estate Assets & Appraisal Experts in Dubai"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-medium">Description</Label>
                <Textarea
                  value={hero.description}
                  onChange={(e) =>
                    setHero((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Brief description for the hero section..."
                  rows={4}
                />
              </div>

              <Button
                onClick={handleSaveHero}
                disabled={saving}
                className="bg-[#C1A06E] hover:bg-[#a88b5e] text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        )}

        {/* ─── ABOUT US TAB ─── */}
        {activeTab === "about" && (
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#C1A06E]/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#C1A06E]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  About Us Content
                </h2>
                <p className="text-sm text-slate-500">
                  Company information displayed on the About page
                </p>
              </div>
            </div>

            <div className="space-y-5 max-w-2xl">
              <div className="space-y-2">
                <Label className="font-medium">Headline</Label>
                <Input
                  value={about.headline}
                  onChange={(e) =>
                    setAbout((prev) => ({ ...prev, headline: e.target.value }))
                  }
                  placeholder="e.g. About A&A Real Estate"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-medium">Description</Label>
                <Textarea
                  value={about.description}
                  onChange={(e) =>
                    setAbout((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Company description..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label className="font-medium">Mission Statement</Label>
                <Textarea
                  value={about.mission}
                  onChange={(e) =>
                    setAbout((prev) => ({ ...prev, mission: e.target.value }))
                  }
                  placeholder="Our mission..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label className="font-medium">Vision Statement</Label>
                <Textarea
                  value={about.vision}
                  onChange={(e) =>
                    setAbout((prev) => ({ ...prev, vision: e.target.value }))
                  }
                  placeholder="Our vision..."
                  rows={3}
                />
              </div>

              <Button
                onClick={handleSaveAbout}
                disabled={saving}
                className="bg-[#C1A06E] hover:bg-[#a88b5e] text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        )}

        {/* ─── CONTACT INFO TAB ─── */}
        {activeTab === "contact" && (
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#C1A06E]/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#C1A06E]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Contact Information
                </h2>
                <p className="text-sm text-slate-500">
                  Office details, phone numbers, and social media links
                </p>
              </div>
            </div>

            <div className="space-y-8 max-w-2xl">
              {/* Office Details */}
              <div className="space-y-5">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  Office Details
                </h3>

                <div className="space-y-2">
                  <Label className="font-medium">Office Address</Label>
                  <Textarea
                    value={contact.officeAddress}
                    onChange={(e) =>
                      setContact((prev) => ({
                        ...prev,
                        officeAddress: e.target.value,
                      }))
                    }
                    placeholder="Full office address..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-medium">Office Hours</Label>
                  <Textarea
                    value={contact.officeHours}
                    onChange={(e) =>
                      setContact((prev) => ({
                        ...prev,
                        officeHours: e.target.value,
                      }))
                    }
                    placeholder="Sun - Thu: 9:00 AM - 6:00 PM..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-medium">
                    Google Maps Embed URL
                  </Label>
                  <Input
                    value={contact.mapEmbedUrl}
                    onChange={(e) =>
                      setContact((prev) => ({
                        ...prev,
                        mapEmbedUrl: e.target.value,
                      }))
                    }
                    placeholder="https://www.google.com/maps/embed?..."
                  />
                  <p className="text-xs text-slate-400">
                    Paste the iframe src URL from Google Maps embed code
                  </p>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="space-y-5">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  Phone & Email
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-medium">Phone Number</Label>
                    <Input
                      value={contact.phone}
                      onChange={(e) =>
                        setContact((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="+971 4 555 1234"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium">WhatsApp Number</Label>
                    <Input
                      value={contact.whatsapp}
                      onChange={(e) =>
                        setContact((prev) => ({
                          ...prev,
                          whatsapp: e.target.value,
                        }))
                      }
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-medium">Email Address</Label>
                  <Input
                    type="email"
                    value={contact.email}
                    onChange={(e) =>
                      setContact((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="info@example.com"
                  />
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-5">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-slate-400" />
                  Social Media Links
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-medium">Facebook</Label>
                    <Input
                      value={contact.socialLinks.facebook}
                      onChange={(e) =>
                        setContact((prev) => ({
                          ...prev,
                          socialLinks: {
                            ...prev.socialLinks,
                            facebook: e.target.value,
                          },
                        }))
                      }
                      placeholder="https://facebook.com/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium">Instagram</Label>
                    <Input
                      value={contact.socialLinks.instagram}
                      onChange={(e) =>
                        setContact((prev) => ({
                          ...prev,
                          socialLinks: {
                            ...prev.socialLinks,
                            instagram: e.target.value,
                          },
                        }))
                      }
                      placeholder="https://instagram.com/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium">LinkedIn</Label>
                    <Input
                      value={contact.socialLinks.linkedin}
                      onChange={(e) =>
                        setContact((prev) => ({
                          ...prev,
                          socialLinks: {
                            ...prev.socialLinks,
                            linkedin: e.target.value,
                          },
                        }))
                      }
                      placeholder="https://linkedin.com/company/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium">Twitter / X</Label>
                    <Input
                      value={contact.socialLinks.twitter}
                      onChange={(e) =>
                        setContact((prev) => ({
                          ...prev,
                          socialLinks: {
                            ...prev.socialLinks,
                            twitter: e.target.value,
                          },
                        }))
                      }
                      placeholder="https://x.com/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-medium">YouTube</Label>
                    <Input
                      value={contact.socialLinks.youtube}
                      onChange={(e) =>
                        setContact((prev) => ({
                          ...prev,
                          socialLinks: {
                            ...prev.socialLinks,
                            youtube: e.target.value,
                          },
                        }))
                      }
                      placeholder="https://youtube.com/@..."
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSaveContact}
                disabled={saving}
                className="bg-[#C1A06E] hover:bg-[#a88b5e] text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
