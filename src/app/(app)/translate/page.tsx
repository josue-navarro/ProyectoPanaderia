'use client';

import React, { useState, useTransition, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { translateText, TranslateTextOutput } from '@/ai/flows/translate';
import { Loader2, Languages, Clipboard, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LanguageContext, supportedLanguages } from '@/components/language-provider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function TranslatePage() {
  const { t } = useContext(LanguageContext);
  const [textToTranslate, setTextToTranslate] = useState<string>('');
  const [targetLanguage, setTargetLanguage] = useState<string>('es');
  const [translationResult, setTranslationResult] = useState<TranslateTextOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleTranslation = () => {
    if (!textToTranslate.trim() || !targetLanguage) return;
    startTransition(async () => {
      const result = await translateText({
        text: textToTranslate,
        targetLanguage: supportedLanguages.find(l => l.code === targetLanguage)?.name || 'Spanish',
      });
      setTranslationResult(result);
    });
  };

  const handleCopyToClipboard = () => {
    if (translationResult?.translatedText) {
      navigator.clipboard.writeText(translationResult.translatedText);
      toast({
        title: t('copied_toast_title'),
        description: t('copied_toast_desc'),
      });
    }
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          <Languages className="text-accent" /> {t('translate_title')}
        </h1>
        <p className="text-muted-foreground">{t('translate_description')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">{t('your_text_title')}</CardTitle>
            <CardDescription>{t('your_text_desc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={t('textarea_placeholder')}
              className="min-h-[15rem]"
              value={textToTranslate}
              onChange={(e) => setTextToTranslate(e.target.value)}
            />
            <Select onValueChange={setTargetLanguage} value={targetLanguage}>
                <SelectTrigger>
                    <SelectValue placeholder={t('select_target_language')} />
                </SelectTrigger>
                <SelectContent>
                    {supportedLanguages.filter(l => l.code !== 'en').map(lang => (
                        <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button onClick={handleTranslation} disabled={isPending || !textToTranslate.trim()} className="w-full">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('translating')}...
                </>
              ) : (
                t('translate')
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">{t('translation_placeholder')}</CardTitle>
            <CardDescription>{t('translation_desc_spanish')}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <div className="relative flex-grow">
                 <Textarea
                    placeholder={t('translation_placeholder')}
                    className="min-h-[15rem] resize-none"
                    readOnly
                    value={translationResult?.translatedText || ''}
                  />
                  {translationResult?.translatedText && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 h-7 w-7"
                      onClick={handleCopyToClipboard}
                    >
                      <Clipboard className="h-4 w-4" />
                      <span className="sr-only">{t('copy_to_clipboard')}</span>
                    </Button>
                  )}
            </div>
             {isPending && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin mb-2" />
                    <p>{t('processing')}...</p>
                  </div>
                </div>
              )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
