'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bell } from 'lucide-react';
import { toast } from 'sonner';

interface SaveSearchDialogProps {
  filters: {
    category: string;
    location: string;
    property_type: string;
    bedrooms: string;
    bathrooms: string;
    minPrice: string;
    maxPrice: string;
    search: string;
  };
  trigger?: React.ReactNode;
}

export default function SaveSearchDialog({ filters, trigger }: SaveSearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter a search name');
      return;
    }

    setIsSaving(true);
    
    try {
      // Here you would save to your API
      // For now, we'll just simulate it and store in localStorage
      const savedSearch = {
        id: Date.now().toString(),
        name: name.trim(),
        criteria: filters,
        emailAlerts,
        isActive: true,
        createdAt: new Date().toISOString(),
      };

      // Get existing saved searches
      const existing = JSON.parse(localStorage.getItem('savedSearches') || '[]');
      localStorage.setItem('savedSearches', JSON.stringify([...existing, savedSearch]));

      toast.success('Search saved successfully!');
      setOpen(false);
      setName('');
    } catch (error) {
      toast.error('Failed to save search');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            Save Search
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save This Search</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <Label htmlFor="search-name">Search Name</Label>
            <Input
              id="search-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Dubai Marina 2BR"
              required
              disabled={isSaving}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <Label htmlFor="email-alerts">Email Alerts</Label>
              <p className="text-sm text-gray-600">Get notified when new properties match</p>
            </div>
            <Switch 
              id="email-alerts"
              checked={emailAlerts} 
              onCheckedChange={setEmailAlerts}
              disabled={isSaving}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-[#C1A06E] hover:bg-[#A68B5B]"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Search'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
