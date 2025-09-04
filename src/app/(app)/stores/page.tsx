
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { stores } from '@/lib/data';
import { MapPin, Phone, Clock, Plus, Pencil, Save, Trash2, Store as StoreIcon } from 'lucide-react';
import { useContext, useState, useEffect, useMemo } from 'react';
import { LanguageContext } from '@/components/language-provider';
import { AuthContext } from '@/components/auth-provider';
import type { Store } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
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
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


function StoreCard({ store, onStoreChange }: { store: Store; onStoreChange: () => void; }) {
  const { t } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(store.id.startsWith('new_'));
  const [editedStore, setEditedStore] = useState(store);

  useEffect(() => {
    setEditedStore(store);
    if (store.id.startsWith('new_')) {
      setIsEditing(true);
    }
  }, [store]);

  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = () => {
    let finalStore = { ...editedStore };
    const storeIndex = stores.findIndex(s => s.id === finalStore.id);

    if (storeIndex !== -1) {
      if (finalStore.id.startsWith('new_')) {
        finalStore.id = `store_${Date.now()}`;
      }
      stores[storeIndex] = finalStore;
    } else {
        // This case should not happen if a new store is pushed correctly
    }

    setIsEditing(false);
    onStoreChange();
    toast({
      title: t('store_saved_title'),
      description: t('store_saved_desc', { storeName: finalStore.name }),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedStore(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (checked: boolean) => {
    setEditedStore(prev => ({ ...prev, isOpen: checked }));
  };

  const handleDelete = () => {
    const storeIndex = stores.findIndex(s => s.id === store.id);
    if (storeIndex > -1) {
      stores.splice(storeIndex, 1);
      onStoreChange();
    }
  };
  
  const canManageStore = user?.role === 'superAdmin' || (user?.role === 'admin' && user?.id === store.ownerId);

  return (
    <Card className="flex flex-col relative overflow-hidden">
       {!isEditing && (
        <Badge 
          className={cn(
            "absolute top-3 right-3 border", 
            store.isOpen ? "bg-green-500/20 text-green-700 border-green-400" : "bg-red-500/20 text-red-700 border-red-400"
          )}
          variant="outline"
        >
          {store.isOpen ? t('store_open') : t('store_closed')}
        </Badge>
      )}
      <CardHeader>
        {isEditing ? (
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs text-muted-foreground">{t('store_name_label')}</Label>
            <Input
              id="name"
              name="name"
              value={editedStore.name}
              onChange={handleInputChange}
              className="font-headline text-xl font-semibold h-9"
              placeholder={t('store_name_placeholder')}
            />
          </div>
        ) : (
          <CardTitle className="font-headline pr-20">{store.name}</CardTitle>
        )}
      </CardHeader>
      <CardContent className="space-y-3 text-sm flex-grow">
        {isEditing ? (
           <div className="space-y-4">
             <div>
                <Label htmlFor="address" className="text-xs text-muted-foreground">{t('address_label')}</Label>
                <Input id="address" name="address" value={editedStore.address} onChange={handleInputChange} placeholder={t('address_placeholder')} />
             </div>
             <div>
                <Label htmlFor="city" className="text-xs text-muted-foreground">{t('city_label')}</Label>
                <Input id="city" name="city" value={editedStore.city} onChange={handleInputChange} placeholder={t('city_placeholder')} />
             </div>
              <div>
                <Label htmlFor="phone" className="text-xs text-muted-foreground">{t('phone_label')}</Label>
                <Input id="phone" name="phone" value={editedStore.phone} onChange={handleInputChange} placeholder={t('phone_placeholder')} />
              </div>
              <div>
                 <Label htmlFor="hours" className="text-xs text-muted-foreground">{t('hours_label')}</Label>
                <Textarea id="hours" name="hours" value={editedStore.hours} onChange={handleInputChange} rows={2} placeholder={t('hours_placeholder')} />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>{t('store_status_label')}</Label>
                    <p className="text-xs text-muted-foreground">
                      {t('store_status_desc')}
                    </p>
                  </div>
                  <Switch
                    checked={editedStore.isOpen}
                    onCheckedChange={handleStatusChange}
                  />
              </div>
           </div>
        ) : (
          <>
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                  <p>{store.address}</p>
                  <p className="text-muted-foreground">{store.city}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <p>{store.phone}</p>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <p className="whitespace-pre-line">{store.hours}</p>
            </div>
          </>
        )}
      </CardContent>
       {canManageStore && (
        <CardFooter className="flex gap-2 pt-4 mt-auto">
          {isEditing ? (
            <Button className="w-full" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> {t('save')}
            </Button>
          ) : (
              <>
              <Button className="flex-1" variant="outline" onClick={handleEdit}>
                  <Pencil className="mr-2 h-4 w-4" /> {t('edit')}
              </Button>
              <AlertDialog>
                  <AlertDialogTrigger asChild>
                      <Button className="flex-1" variant="destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> {t('delete')}
                      </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                      <AlertDialogHeader>
                      <AlertDialogTitle>{t('are_you_sure')}</AlertDialogTitle>
                      <AlertDialogDescription>
                          {t('delete_store_confirm_message')}
                      </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                      <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                          {t('confirm_delete')}
                      </AlertDialogAction>
                      </AlertDialogFooter>
                  </AlertDialogContent>
              </AlertDialog>
              </>
          )}
        </CardFooter>
       )}
    </Card>
  )
}


function AddStoreCard({ onAdd }: { onAdd: () => void }) {
  const { t } = useContext(LanguageContext);
  return (
    <Card 
      className="flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed bg-muted/50 hover:bg-muted/80 hover:border-primary transition-colors cursor-pointer"
      onClick={onAdd}
    >
      <Plus className="h-16 w-16 text-muted-foreground" />
      <p className="mt-2 font-medium text-muted-foreground">{t('add_new_store')}</p>
    </Card>
  )
}


export default function StoresPage() {
  const { t } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);

  const [version, setVersion] = useState(0);
  const forceRerender = () => setVersion(v => v + 1);

  const handleAddStore = () => {
    if (!user) return;
    const newStore: Store = {
      id: `new_${Date.now()}`,
      name: '',
      address: '',
      city: '',
      phone: '',
      hours: t('hours_template'),
      isOpen: true,
      ownerId: user.id, // Assign the current user as the owner
    };
    stores.push(newStore);
    forceRerender();
  };

  const displayedStores = useMemo(() => {
    if (!user) return [];
    if (user.role === 'customer') {
      return stores; // Customers see all stores
    }
    // superAdmin and admin see only the stores they own
    return stores.filter(store => store.ownerId === user.id);
  }, [user, version]);

  const canManageStores = user?.role === 'superAdmin' || user?.role === 'admin';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">{t('stores_title')}</h1>
        <p className="text-muted-foreground">{t('stores_description')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedStores.map(store => (
          <StoreCard key={store.id} store={store} onStoreChange={forceRerender} />
        ))}
        {canManageStores && <AddStoreCard onAdd={handleAddStore} />}
      </div>
    </div>
  )
}
