"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Settings, Shield, UserPlus, Trash2 } from "lucide-react";

type PermissionKey =
  | "dashboard"
  | "properties"
  | "inquiries"
  | "blog"
  | "testimonials"
  | "users"
  | "content"
  | "developers"
  | "settings";

const permissionLabels: Record<PermissionKey, string> = {
  dashboard: "Dashboard",
  properties: "Properties",
  inquiries: "Inquiries",
  blog: "Blog",
  testimonials: "Testimonials",
  users: "Users",
  content: "Content",
  developers: "Developers",
  settings: "Settings",
};

const allPermissions = Object.keys(permissionLabels) as PermissionKey[];

interface AdminAccount {
  id?: string;
  _id: string;
  name: string;
  email: string;
  accessLevel: "full" | "limited";
  isActive: boolean;
  permissions: Record<PermissionKey, boolean>;
}

export default function AdminSettingsPage() {
  const { hasPermission, admin } = useAuth();

  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [savingAdmin, setSavingAdmin] = useState(false);
  const [admins, setAdmins] = useState<AdminAccount[]>([]);

  const [general, setGeneral] = useState({
    applicationName: "",
    supportEmail: "",
    supportPhone: "",
    whatsappNumber: "",
    timezone: "Asia/Dubai",
    maintenanceMode: false,
  });
  const [security, setSecurity] = useState({
    sessionTimeoutMinutes: 15,
    allowNewAdminCreation: true,
  });

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    accessLevel: "limited" as "full" | "limited",
    permissions: allPermissions.reduce(
      (acc, key) => {
        acc[key] = key === "dashboard" || key === "inquiries";
        return acc;
      },
      {} as Record<PermissionKey, boolean>,
    ),
  });

  const canOpenSettings = hasPermission("settings");
  const isFullAccess = admin?.accessLevel !== "limited";

  const fetchData = async () => {
    try {
      setLoading(true);
      const [settingsRes, adminsRes] = await Promise.all([
        api.getAppSettings(),
        api.getAdminAccounts(),
      ]);

      if (settingsRes.success && settingsRes.data) {
        const data = settingsRes.data;
        setGeneral({
          applicationName: data.general?.applicationName || "",
          supportEmail: data.general?.supportEmail || "",
          supportPhone: data.general?.supportPhone || "",
          whatsappNumber: data.general?.whatsappNumber || "",
          timezone: data.general?.timezone || "Asia/Dubai",
          maintenanceMode: Boolean(data.general?.maintenanceMode),
        });
        setSecurity({
          sessionTimeoutMinutes: Number(data.security?.sessionTimeoutMinutes || 15),
          allowNewAdminCreation: Boolean(data.security?.allowNewAdminCreation ?? true),
        });
      }

      if (adminsRes.success) {
        setAdmins(adminsRes.admins || []);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (canOpenSettings) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [canOpenSettings]);

  const saveSettings = async () => {
    try {
      setSavingSettings(true);
      const response = await api.updateAppSettings({ general, security });
      if (!response.success) {
        toast.error(response.message || "Failed to save settings");
        return;
      }
      toast.success("Application settings updated");
    } catch (error: any) {
      toast.error(error.message || "Failed to save settings");
    } finally {
      setSavingSettings(false);
    }
  };

  const createAdmin = async () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
      toast.error("Name, email, and password are required");
      return;
    }

    try {
      setSavingAdmin(true);
      const response = await api.createAdminAccount({
        name: newAdmin.name,
        email: newAdmin.email,
        password: newAdmin.password,
        accessLevel: newAdmin.accessLevel,
        permissions:
          newAdmin.accessLevel === "limited" ? newAdmin.permissions : undefined,
      });

      if (!response.success) {
        toast.error(response.message || "Failed to create admin");
        return;
      }

      toast.success("Admin account created");
      setNewAdmin({
        name: "",
        email: "",
        password: "",
        accessLevel: "limited",
        permissions: allPermissions.reduce(
          (acc, key) => {
            acc[key] = key === "dashboard" || key === "inquiries";
            return acc;
          },
          {} as Record<PermissionKey, boolean>,
        ),
      });
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Failed to create admin");
    } finally {
      setSavingAdmin(false);
    }
  };

  const toggleAdminStatus = async (item: AdminAccount, isActive: boolean) => {
    try {
      const response = await api.updateAdminAccount(item._id, { isActive });
      if (!response.success) {
        toast.error(response.message || "Failed to update admin");
        return;
      }
      toast.success("Admin status updated");
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Failed to update admin");
    }
  };

  const deleteAdmin = async (id: string) => {
    try {
      const response = await api.deleteAdminAccount(id);
      if (!response.success) {
        toast.error(response.message || "Failed to delete admin");
        return;
      }
      toast.success("Admin deleted");
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete admin");
    }
  };

  const totalAdmins = useMemo(() => admins.length, [admins]);

  if (!canOpenSettings) {
    return (
      <div className="bg-white border border-slate-100 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-500">
          You do not have permission to access settings.
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className="text-slate-500">Loading settings...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Application Settings</h1>
        <p className="text-slate-500 mt-1">
          Manage system configuration and admin access control
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#C1A06E]" />
            <h2 className="text-lg font-semibold text-slate-900">General</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Application Name</Label>
              <Input
                value={general.applicationName}
                onChange={(e) =>
                  setGeneral((prev) => ({ ...prev, applicationName: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Support Email</Label>
              <Input
                type="email"
                value={general.supportEmail}
                onChange={(e) =>
                  setGeneral((prev) => ({ ...prev, supportEmail: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Support Phone</Label>
              <Input
                value={general.supportPhone}
                onChange={(e) =>
                  setGeneral((prev) => ({ ...prev, supportPhone: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp Number</Label>
              <Input
                value={general.whatsappNumber}
                onChange={(e) =>
                  setGeneral((prev) => ({ ...prev, whatsappNumber: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Timezone</Label>
              <Input
                value={general.timezone}
                onChange={(e) =>
                  setGeneral((prev) => ({ ...prev, timezone: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Session Timeout (minutes)</Label>
              <Input
                type="number"
                min={5}
                max={1440}
                value={security.sessionTimeoutMinutes}
                onChange={(e) =>
                  setSecurity((prev) => ({
                    ...prev,
                    sessionTimeoutMinutes: Number(e.target.value || 15),
                  }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800">Maintenance Mode</p>
                  <p className="text-xs text-slate-500">Restrict public operations during maintenance</p>
                </div>
                <input
                  type="checkbox"
                  checked={general.maintenanceMode}
                  onChange={(e) =>
                    setGeneral((prev) => ({
                      ...prev,
                      maintenanceMode: e.target.checked,
                    }))
                  }
                />
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800">Allow New Admin Creation</p>
                  <p className="text-xs text-slate-500">Control whether full admins can onboard others</p>
                </div>
                <input
                  type="checkbox"
                  checked={security.allowNewAdminCreation}
                  onChange={(e) =>
                    setSecurity((prev) => ({
                      ...prev,
                      allowNewAdminCreation: e.target.checked,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <Button
            onClick={saveSettings}
            disabled={savingSettings}
            className="bg-[#C1A06E] hover:bg-[#a88b5e] text-white"
          >
            {savingSettings ? "Saving..." : "Save Settings"}
          </Button>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-[#C1A06E]" />
            <h2 className="text-lg font-semibold text-slate-900">Admin Accounts</h2>
          </div>
          <p className="text-slate-500 text-sm mb-4">{totalAdmins} accounts configured</p>

          <div className="space-y-3 max-h-[360px] overflow-auto pr-1">
            {admins.map((item) => (
              <div
                key={item._id}
                className="rounded-lg border border-slate-200 p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                    {item.accessLevel}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{item.email}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                  {isFullAccess && item._id !== admin?.id && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAdminStatus(item, !item.isActive)}
                      >
                        {item.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete admin account?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action is permanent and cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteAdmin(item._id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <UserPlus className="w-5 h-5 text-[#C1A06E]" />
          <h2 className="text-lg font-semibold text-slate-900">Create Admin Account</h2>
        </div>
        {!isFullAccess ? (
          <p className="text-sm text-slate-500">
            Only full-access admins can create new admin accounts.
          </p>
        ) : !security.allowNewAdminCreation ? (
          <p className="text-sm text-slate-500">
            Admin creation is disabled. Enable it in the general settings first.
          </p>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={newAdmin.name}
                  onChange={(e) =>
                    setNewAdmin((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Temporary Password</Label>
                <Input
                  type="password"
                  value={newAdmin.password}
                  onChange={(e) =>
                    setNewAdmin((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Access Level</Label>
              <Select
                value={newAdmin.accessLevel}
                onValueChange={(value: "full" | "limited") =>
                  setNewAdmin((prev) => ({ ...prev, accessLevel: value }))
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Access</SelectItem>
                  <SelectItem value="limited">Limited Access</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newAdmin.accessLevel === "limited" && (
              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {allPermissions.map((key) => (
                    <label
                      key={key}
                      className="flex items-center gap-2 text-sm rounded-md border border-slate-200 px-3 py-2"
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(newAdmin.permissions[key])}
                        onChange={(e) =>
                          setNewAdmin((prev) => ({
                            ...prev,
                            permissions: {
                              ...prev.permissions,
                              [key]: e.target.checked,
                            },
                          }))
                        }
                      />
                      {permissionLabels[key]}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={createAdmin}
              disabled={savingAdmin}
              className="bg-[#C1A06E] hover:bg-[#a88b5e] text-white"
            >
              {savingAdmin ? "Creating..." : "Create Admin"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
