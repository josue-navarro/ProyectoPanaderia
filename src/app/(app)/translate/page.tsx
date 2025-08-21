'use client';

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { translateText, TranslateTextOutput } from '@/ai/flows/translate';
import { Loader2, Languages, Clipboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function TranslatePage() {
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
        title: 'Copied to clipboard!',
        description: 'The translated text has been copied.',
      });
    }
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          <Languages className="text-accent" /> AI Translator
        </h1>
        <p className="text-muted-foreground">Translate text to Spanish in an instant.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Text</CardTitle>
            <CardDescription>Enter the text you want to translate.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Type or paste your text here..."
              className="min-h-[15rem]"
              value={textToTranslate}
              onChange={(e) => setTextToTranslate(e.target.value)}
            />
            <Button onClick={handleTranslation} disabled={isPending || !textToTranslate.trim()} className="w-full mt-4">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Translating...
                </>
              ) : (
                'Translate to Spanish'
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">Translation (Spanish)</CardTitle>
            <CardDescription>The translated text will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <div className="relative flex-grow">
                 <Textarea
                    placeholder="Translation..."
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
                      <span className="sr-only">Copy to clipboard</span>
                    </Button>
                  )}
            </div>
             {isPending && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin mb-2" />
                    <p>Processing...</p>
                  </div>
                </div>
              )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
