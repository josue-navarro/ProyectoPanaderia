
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { LanguageContext } from '@/components/language-provider';
import { useContext } from 'react';
import { Paintbrush, Palette, Type, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const themes = [
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
];

const accentColors = [
  { name: 'Brown', value: '28 30% 50%' },
  { name: 'Blue', value: '221 83% 53%' },
  { name: 'Green', value: '142 76% 36%' },
  { name: 'Rose', value: '346 83% 61%' },
];

const fonts = [
  { name: 'PT Sans & Playfair Display', value: 'default' },
  { name: 'Inter', value: 'inter' },
  { name: 'Roboto', value: 'roboto' },
];

export default function SettingsPage() {
  const { t } = useContext(LanguageContext);
  const { toast } = useToast();

  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('light');
  const [accent, setAccent] = useState(accentColors[0].value);
  const [font, setFont] = useState('default');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    const storedAccent = localStorage.getItem('accent-color') || accentColors[0].value;
    const storedFont = localStorage.getItem('font-family') || 'default';
    setTheme(storedTheme);
    setAccent(storedAccent);
    setFont(storedFont);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  useEffect(() => {
    if (mounted) {
        document.documentElement.style.setProperty('--primary', accent);
        localStorage.setItem('accent-color', accent);
    }
  }, [accent, mounted]);

  useEffect(() => {
    if (mounted) {
      document.body.classList.remove('font-default', 'font-inter', 'font-roboto');
      document.body.classList.add(`font-${font}`);
      localStorage.setItem('font-family', font);
    }
  }, [font, mounted]);
  

  const handleSave = () => {
    toast({
      title: t('settings_saved'),
      description: t('settings_saved_desc'),
    });
  };

  if (!mounted) {
    return null; // or a spinner
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">{t('settings')}</h1>
        <p className="text-muted-foreground">{t('settings_description')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">{t('appearance')}</CardTitle>
          <CardDescription>{t('appearance_desc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <Label className="flex items-center gap-2"><Paintbrush className="h-4 w-4"/>{t('theme')}</Label>
            <RadioGroup value={theme} onValueChange={setTheme} className="flex space-x-4">
              {themes.map(t => (
                <Label key={t.value} htmlFor={`theme-${t.value}`} className="flex items-center space-x-2 cursor-pointer p-4 border rounded-md has-[:checked]:bg-accent has-[:checked]:text-accent-foreground has-[:checked]:border-primary flex-1 justify-center">
                  <RadioGroupItem value={t.value} id={`theme-${t.value}`} className="sr-only" />
                  <span>{t.name}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="flex items-center gap-2"><Palette className="h-4 w-4"/>{t('accent_color')}</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {accentColors.map(color => (
                <Button 
                    key={color.name}
                    variant="outline"
                    className={cn("h-16 flex items-center justify-between", accent === color.value && "border-2 border-primary ring-2 ring-primary/50")}
                    style={{'--custom-color': `hsl(${color.value})`} as React.CSSProperties}
                    onClick={() => setAccent(color.value)}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[--custom-color]"></div>
                        <span>{color.name}</span>
                    </div>
                    {accent === color.value && <Check className="h-5 w-5 text-primary" />}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <Label className="flex items-center gap-2"><Type className="h-4 w-4"/>{t('font')}</Label>
            <Select value={font} onValueChange={setFont}>
              <SelectTrigger className="max-w-xs">
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                {fonts.map(f => (
                  <SelectItem key={f.value} value={f.value}>{f.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
