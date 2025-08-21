'use client';

import React, { useState, useTransition, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { translateText, TranslateTextOutput } from '@/ai/flows/translate';
import { Loader2, Languages, Clipboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LanguageContext } from '@/components/language-provider';

export default function TranslatePage() {
  const { t } = useContext(LanguageContext);
  const [textToTranslate, setTextToTranslate] = useState<string>('');
  const [translationResult, setTranslationResult] = useState<TranslateTextOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleTranslation = () => {
    if (!textToTranslate.trim()) return;
    startTransition(async () => {
      const result = await translateText({
        text: textToTranslate,
        targetLanguage: 'Spanish',
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
          <CardContent>
            <Textarea
              placeholder={t('textarea_placeholder')}
              className="min-h-[15rem]"
              value={textToTranslate}
              onChange={(e) => setTextToTranslate(e.target.value)}
            />
            <Button onClick={handleTranslation} disabled={isPending || !textToTranslate.trim()} className="w-full mt-4">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('translating')}...
                </>
              ) : (
                t('translate_to_spanish')
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">{t('translation_title_spanish')}</CardTitle>
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
