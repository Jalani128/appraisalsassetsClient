"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import AdminSidebar from "@/components/admin-sidebar";
import AdminHeader from "@/components/admin-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Star,
  Edit,
  Trash2,
  Plus,
  Home,
  Key,
  DollarSign,
  TrendingUp,
  Upload,
  Link,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  testimonialText: string;
  rating: number;
  clientImage: string;
  propertyType: string;
  isFeatured: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminTestimonials() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageInputMode, setImageInputMode] = useState<"url" | "upload">("url");
  const [formData, setFormData] = useState({
    clientName: "",
    clientRole: "",
    clientCompany: "",
    testimonialText: "",
    rating: 5,
    clientImage: "",
    propertyType: "sale",
    isFeatured: false,
    isActive: true,
  });

  const resetForm = () => {
    setFormData({
      clientName: "",
      clientRole: "",
      clientCompany: "",
      testimonialText: "",
      rating: 5,
      clientImage: "",
      propertyType: "sale",
      isFeatured: false,
      isActive: true,
    });
    setEditingTestimonial(null);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const response = await api.getTestimonials();
      if (response.success) {
        setTestimonials(response.data || []);
      } else {
        toast.error(response.message || "Failed to fetch testimonials");
      }
    } catch (error: any) {
      console.error("Error fetching testimonials:", error);
      toast.error(error.message || "Failed to fetch testimonials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData(testimonial);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "clientImage") {
          formDataToSend.append(key, value.toString());
        }
      });

      // Handle image upload only if file is selected or URL is provided
      const fileInput = document.getElementById(
        "image-upload",
      ) as HTMLInputElement;
      if (fileInput?.files?.[0]) {
        formDataToSend.append("clientImage", fileInput.files[0]);
      } else if (formData.clientImage && formData.clientImage.trim()) {
        // Only append if it's a non-empty URL
        formDataToSend.append("clientImage", formData.clientImage.trim());
      }
      // If no image is provided, don't append the clientImage field at all

      let response;
      if (editingTestimonial) {
        response = await api.updateTestimonial(
          editingTestimonial.id,
          formDataToSend,
        );
      } else {
        response = await api.createTestimonial(formDataToSend);
      }

      if (response.success) {
        toast.success(
          editingTestimonial
            ? "Testimonial updated successfully"
            : "Testimonial created successfully",
        );
        resetForm();
        setDialogOpen(false);
        fetchTestimonials(); // Refresh the list
      } else {
        toast.error(response.message || "Failed to save testimonial");
      }
    } catch (error: any) {
      console.error("Error saving testimonial:", error);
      toast.error(error.message || "Failed to save testimonial");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await api.deleteTestimonial(id);

      if (response.success) {
        toast.success("Testimonial deleted successfully");
        fetchTestimonials(); // Refresh the list
      } else {
        toast.error(response.message || "Failed to delete testimonial");
      }
    } catch (error: any) {
      console.error("Error deleting testimonial:", error);
      toast.error(error.message || "Failed to delete testimonial");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, isActive: boolean) => {
    try {
      const response = await api.toggleTestimonialStatus(id, isActive);
      if (response.success) {
        toast.success(
          `Testimonial ${isActive ? "activated" : "deactivated"} successfully`,
        );
        fetchTestimonials(); // Refresh the list
      } else {
        toast.error(response.message || "Failed to update status");
      }
    } catch (error: any) {
      console.error("Error toggling status:", error);
      toast.error(error.message || "Failed to update status");
    }
  };

  const handleToggleFeatured = async (id: string, isFeatured: boolean) => {
    try {
      const response = await api.toggleFeaturedStatus(id, isFeatured);
      if (response.success) {
        toast.success(
          `Testimonial ${isFeatured ? "marked as featured" : "removed from featured"} successfully`,
        );
        fetchTestimonials(); // Refresh the list
      } else {
        toast.error(response.message || "Failed to update featured status");
      }
    } catch (error: any) {
      console.error("Error toggling featured:", error);
      toast.error(error.message || "Failed to update featured status");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Client Testimonials
              </h2>
              <p className="text-gray-600">
                Manage customer reviews and feedback
              </p>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-[#C5A572] hover:bg-[#A68B5B]"
                  onClick={resetForm}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Testimonial
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingTestimonial
                      ? "Edit Testimonial"
                      : "Add New Testimonial"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingTestimonial
                      ? "Edit the client testimonial details below."
                      : "Fill in the form below to add a new client testimonial."}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label className="mb-2 block">Client Name *</Label>
                    <Input
                      value={formData.clientName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          clientName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-2 block">Role/Title</Label>
                      <Input
                        value={formData.clientRole}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            clientRole: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Company</Label>
                      <Input
                        value={formData.clientCompany}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            clientCompany: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Testimonial Text *</Label>
                    <Textarea
                      value={formData.testimonialText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          testimonialText: e.target.value,
                        })
                      }
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-2 block">Rating *</Label>
                      <Select
                        value={String(formData.rating)}
                        onValueChange={(v) =>
                          setFormData({ ...formData, rating: Number(v) })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                <Star className="w-4 h-4 fill-[#C5A572] text-[#C5A572]" />
                                <Star className="w-4 h-4 fill-[#C5A572] text-[#C5A572]" />
                                <Star className="w-4 h-4 fill-[#C5A572] text-[#C5A572]" />
                                <Star className="w-4 h-4 fill-[#C5A572] text-[#C5A572]" />
                                <Star className="w-4 h-4 fill-[#C5A572] text-[#C5A572]" />
                              </div>
                              <span>5 Stars - Excellent</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="4">
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                <Star className="w-4 h-4 fill-[#C5A572] text-[#C5A572]" />
                                <Star className="w-4 h-4 fill-[#C5A572] text-[#C5A572]" />
                                <Star className="w-4 h-4 fill-[#C5A572] text-[#C5A572]" />
                                <Star className="w-4 h-4 fill-[#C5A572] text-[#C5A572]" />
                                <Star className="w-4 h-4 text-gray-300" />
                              </div>
                              <span>4 Stars - Very Good</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="3">
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                <Star className="w-4 h-4 fill-[#C5A572] text-[#C5A572]" />
                                <Star className="w-4 h-4 fill-[#C5A572] text-[#C5A572]" />
                                <Star className="w-4 h-4 fill-[#C5A572] text-[#C5A572]" />
                                <Star className="w-4 h-4 text-gray-300" />
                                <Star className="w-4 h-4 text-gray-300" />
                              </div>
                              <span>3 Stars - Good</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="2">
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                <Star className="w-4 h-4 fill-[#C5A572] text-[#C5A572]" />
                                <Star className="w-4 h-4 fill-[#C5A572] text-[#C5A572]" />
                                <Star className="w-4 h-4 text-gray-300" />
                                <Star className="w-4 h-4 text-gray-300" />
                                <Star className="w-4 h-4 text-gray-300" />
                              </div>
                              <span>2 Stars - Fair</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="1">
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                <Star className="w-4 h-4 fill-[#C5A572] text-[#C5A572]" />
                                <Star className="w-4 h-4 text-gray-300" />
                                <Star className="w-4 h-4 text-gray-300" />
                                <Star className="w-4 h-4 text-gray-300" />
                                <Star className="w-4 h-4 text-gray-300" />
                              </div>
                              <span>1 Star - Poor</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2 block">Service Type *</Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(v) =>
                          setFormData({ ...formData, propertyType: v })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sale">
                            <div className="flex items-center gap-2">
                              <Home className="w-4 h-4" />
                              <span>Purchase - Buying Property</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="rent">
                            <div className="flex items-center gap-2">
                              <Key className="w-4 h-4" />
                              <span>Rental - Renting Property</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="valuation">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4" />
                              <span>Valuation - Property Valuation</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="investment">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4" />
                              <span>Investment - Investment Advisory</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Client Image</Label>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={
                            imageInputMode === "url" ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setImageInputMode("url")}
                          className="flex-1"
                        >
                          <Link className="w-4 h-4 mr-2" />
                          Image URL
                        </Button>
                        <Button
                          type="button"
                          variant={
                            imageInputMode === "upload" ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setImageInputMode("upload")}
                          className="flex-1"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Image
                        </Button>
                      </div>

                      {imageInputMode === "url" ? (
                        <Input
                          value={formData.clientImage}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              clientImage: e.target.value,
                            })
                          }
                          placeholder="https://example.com/image.jpg"
                        />
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                // For now, just store the file name
                                // In real implementation, you'd upload to a server
                                setFormData({
                                  ...formData,
                                  clientImage: file.name,
                                });
                              }
                            }}
                            className="hidden"
                            id="image-upload"
                          />
                          <label
                            htmlFor="image-upload"
                            className="cursor-pointer"
                          >
                            <div className="text-gray-500">
                              <Upload className="w-8 h-8 mx-auto mb-2" />
                              <p className="text-sm">Click to upload image</p>
                              <p className="text-xs text-gray-400">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          </label>
                        </div>
                      )}

                      {formData.clientImage && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600 mb-2">Preview:</p>
                          <img
                            src={
                              imageInputMode === "url"
                                ? formData.clientImage
                                : URL.createObjectURL(
                                    (
                                      document.getElementById(
                                        "image-upload",
                                      ) as HTMLInputElement
                                    )?.files?.[0] || new Blob(),
                                  )
                            }
                            alt="Preview"
                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={formData.isFeatured}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, isFeatured: checked })
                        }
                      />
                      <Label>Featured (show on homepage)</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={formData.isActive}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, isActive: checked })
                        }
                      />
                      <Label>Active</Label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#C5A572] hover:bg-[#A68B5B]"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "Saving..."
                        : (editingTestimonial ? "Update" : "Create") +
                          " Testimonial"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="text-center py-12">Loading...</div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">No testimonials found</div>
              <p className="text-gray-400">
                Click &quot;Add Testimonial&quot; to create your first
                testimonial
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4">
                            {testimonial.clientImage &&
                              testimonial.clientImage.trim() !== "" && (
                                <img
                                  src={testimonial.clientImage}
                                  alt={testimonial.clientName}
                                  className="w-16 h-16 rounded-full object-cover"
                                />
                              )}
                            <div>
                              <h3 className="font-semibold text-lg">
                                {testimonial.clientName}
                              </h3>
                              {testimonial.clientRole && (
                                <p className="text-sm text-gray-600">
                                  {testimonial.clientRole}
                                  {testimonial.clientCompany &&
                                    ` at ${testimonial.clientCompany}`}
                                </p>
                              )}
                              <div className="flex items-center gap-2 mt-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${i < testimonial.rating ? "fill-[#C5A572] text-[#C5A572]" : "text-gray-300"}`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500 capitalize">
                                  {testimonial.propertyType}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {testimonial.isFeatured && (
                              <span className="px-2 py-1 bg-[#C5A572] text-white text-xs rounded">
                                Featured
                              </span>
                            )}
                            {!testimonial.isActive && (
                              <span className="px-2 py-1 bg-gray-400 text-white text-xs rounded">
                                Inactive
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="mt-4 text-gray-700 leading-relaxed">
                          {testimonial.testimonialText}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(testimonial)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Testimonial
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this
                                testimonial? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(testimonial.id)}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
