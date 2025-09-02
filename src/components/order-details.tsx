
'use client';

import { useContext } from 'react';
import { Separator } from '@/components/ui/separator';
import { LanguageContext } from '@/components/language-provider';
import type { Order } from '@/lib/types';
import { User, MapPin } from 'lucide-react';
import { CreditCardIcon } from '@/components/ui/icons/credit-card';

export function OrderDetails({ order }: { order: Order }) {
  const { t } = useContext(LanguageContext);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <h3 className="font-semibold flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /> {t('customer_name')}</h3>
          <p className="text-muted-foreground">{order.customerName}</p>
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /> {t('delivery_address')}</h3>
          <p className="text-muted-foreground">{order.deliveryAddress}</p>
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold flex items-center gap-2"><CreditCardIcon className="h-4 w-4 text-muted-foreground" /> {t('payment_method')}</h3>
          <p className="text-muted-foreground">{order.paymentMethod}</p>
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="font-semibold mb-2">{t('order_summary')}</h3>
        <div className="space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <p className="text-muted-foreground">
                {item.quantity} x {item.product.name}
              </p>
              <p>${(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div className="flex justify-between items-center font-bold">
        <p>{t('total')}</p>
        <p>${order.total.toFixed(2)}</p>
      </div>
    </div>
  );
}
