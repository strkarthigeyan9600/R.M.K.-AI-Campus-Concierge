import React, { createContext, useContext, useState, useEffect } from 'react';

interface VoiceContextType {
    isListening: boolean;
    isSpeaking: boolean;
    transcript: string;
    audioLevel: number;
    startListening: (onResult?: (text: string) => void) => void;
    stopListening: () => void;
    speak: (text: string) => void;
    stopSpeaking: () => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [audioLevel, setAudioLevel] = useState(0);

    // Audio wave level simulation for listening & speaking visualizer
    useEffect(() => {
        let interval: any;
        if (isListening || isSpeaking) {
            interval = setInterval(() => {
                setAudioLevel(Math.random() * 0.8 + 0.2);
            }, 100);
        } else {
            setAudioLevel(0);
        }
        return () => clearInterval(interval);
    }, [isListening, isSpeaking]);

    const startListening = (onResult?: (text: string) => void) => {
        setIsListening(true);
        setTranscript('');

        // Web Speech API recognition fallback
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;

            recognition.onresult = (event: any) => {
                const text = Array.from(event.results)
                    .map((result: any) => result[0].transcript)
                    .join('');
                setTranscript(text);
                if (event.results[0].isFinal && onResult) {
                    onResult(text);
                    setIsListening(false);
                }
            };

            recognition.onerror = () => {
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.start();
        } else {
            // Fallback simulation for browsers without Web Speech API
            setTimeout(() => {
                const simulatedText = "Where is Dr. Alan Turing cabin?";
                setTranscript(simulatedText);
                if (onResult) onResult(simulatedText);
                setIsListening(false);
            }, 3000);
        }
    };

    const stopListening = () => {
        setIsListening(false);
    };

    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            window.speechSynthesis.speak(utterance);
        } else {
            setIsSpeaking(true);
            setTimeout(() => setIsSpeaking(false), 4000);
        }
    };

    const stopSpeaking = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        setIsSpeaking(false);
    };

    return (
        <VoiceContext.Provider
            value={{
                isListening,
                isSpeaking,
                transcript,
                audioLevel,
                startListening,
                stopListening,
                speak,
                stopSpeaking
            }}
        >
            {children}
        </VoiceContext.Provider>
    );
};

export const useVoice = () => {
    const ctx = useContext(VoiceContext);
    if (!ctx) throw new Error('useVoice must be used within VoiceProvider');
    return ctx;
};
