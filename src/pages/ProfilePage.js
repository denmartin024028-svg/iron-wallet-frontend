import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import DashboardLayout from '../components/DashboardLayout';
import { userAPI } from '../lib/api';

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const { data: profile, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const response = await userAPI.getProfile();
      setFormData({ name: response.data.name, phone: response.data.phone });
      return response.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => userAPI.updateProfile(data),
    onSuccess: () => {
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      queryClient.invalidateQueries(['user-profile']);
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Update failed');
    },
  });

  const handleUpdate = () => {
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-white/70">Loading profile...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-['Outfit'] text-white">Profile</h1>
          <p className="text-white/70 mt-2">Manage your account information</p>
        </div>

        <div className="max-w-2xl">
          <Card className="bg-[#121212] border border-white/5 p-8 rounded-xl">
            <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-white/5">
              <div className="bg-[#FFD700]/10 p-4 rounded-full">
                <User className="w-12 h-12 text-[#FFD700]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-['Outfit'] text-white">{profile?.name}</h2>
                <p className="text-white/50">{profile?.email}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    data-testid="profile-name-input"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    className="bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] rounded-lg h-12 pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    type="email"
                    value={profile?.email}
                    disabled
                    className="bg-white/5 border border-white/10 text-white/50 rounded-lg h-12 pl-10 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-white/50 mt-2">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    data-testid="profile-phone-input"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] rounded-lg h-12 pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Member Since</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    type="text"
                    value={new Date(profile?.created_at).toLocaleDateString()}
                    disabled
                    className="bg-white/5 border border-white/10 text-white/50 rounded-lg h-12 pl-10 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                {isEditing ? (
                  <>
                    <Button
                      data-testid="profile-save-btn"
                      onClick={handleUpdate}
                      disabled={updateMutation.isPending}
                      className="flex-1 bg-[#FFD700] text-black hover:bg-[#FFE55C] font-bold py-3 rounded-full"
                    >
                      {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      data-testid="profile-cancel-btn"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({ name: profile?.name, phone: profile?.phone });
                      }}
                      className="flex-1 bg-transparent border border-white/20 text-white hover:bg-white/5 py-3 rounded-full"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    data-testid="profile-edit-btn"
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-[#FFD700] text-black hover:bg-[#FFE55C] font-bold py-3 rounded-full"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ProfilePage;
