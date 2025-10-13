"use client";

import { useState, useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Bot, Loader2 } from 'lucide-react';
import { adjustIotDemo } from '@/ai/flows/iot-demo-adjustments';
import { useToast } from '@/hooks/use-toast';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const initialSensorData = [
    { name: 'Temp', value: 22.5 },
    { name: 'Humidity', value: 45 },
    { name: 'Pressure', value: 1012 },
    { name: 'Light', value: 500 },
];

const chartConfig = {
    value: {
        label: 'Value',
        color: 'hsl(var(--primary))',
    },
} satisfies ChartConfig;


export function IotDemoSection() {
    const { toast } = useToast();
    const [sensorData, setSensorData] = useState(initialSensorData);
    const [ledPattern, setLedPattern] = useState(Array(64).fill('#333'));
    const [cloudLogs, setCloudLogs] = useState<string[]>(['[SYS] Initializing IoT Demo...']);
    const [isLoading, setIsLoading] = useState(false);
    const [timeOfDay, setTimeOfDay] = useState('morning');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setTimeOfDay('morning');
        else if (hour < 18) setTimeOfDay('afternoon');
        else setTimeOfDay('evening');
    }, []);

    const addLog = (message: string) => {
        setCloudLogs(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev.slice(0, 4)]);
    };

    const handleAdjust = async () => {
        setIsLoading(true);
        addLog('[AI] Requesting parameter adjustment...');
        try {
            const res = await adjustIotDemo({ timeOfDay, recentInteractions: 'User is viewing the IoT demo section.' });
            
            addLog(`[AI] Received: ${res.sensorReadingAdjustment}`);
            
            // Naive parsing of AI response
            const newSensorData = [...sensorData];
            const tempMatch = res.sensorReadingAdjustment.match(/temperature to ([\d.]+)/);
            if (tempMatch) {
                const tempSensor = newSensorData.find(d => d.name === 'Temp');
                if (tempSensor) tempSensor.value = parseFloat(tempMatch[1]);
            }
            setSensorData(newSensorData);

            addLog(`[AI] Received: ${res.ledPatternAdjustment}`);
            if (res.ledPatternAdjustment.toLowerCase().includes('blink')) {
                let on = true;
                const interval = setInterval(() => {
                    setLedPattern(Array(64).fill(on ? 'hsl(var(--primary))' : '#333'));
                    on = !on;
                }, 500);
                setTimeout(() => clearInterval(interval), 3000);
            } else {
                 setLedPattern(Array(64).fill('hsl(var(--primary))'));
            }

            addLog(`[AI] Received: ${res.cloudDataAdjustment}`);

        } catch (error) {
            console.error('AI adjustment failed:', error);
            addLog('[ERR] AI adjustment failed.');
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not get adjustments from AI.',
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <section id="iot-demo" className="container mx-auto px-4 md:px-6 py-12 md:py-24">
            <div className="flex flex-col items-start space-y-4 mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Live IoT Demo</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                    An AI-powered visualization of sensor data, device control, and cloud communication.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Live Sensor Readings</CardTitle>
                        <CardDescription>Simulated real-time data from an IoT device.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="w-full h-[250px]">
                            <BarChart data={sensorData} accessibilityLayer>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                                <YAxis />
                                <Tooltip cursor={false} content={<ChartTooltipContent />} />
                                <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Device Control & Cloud Data</CardTitle>
                        <CardDescription>Interact with the device and monitor its cloud activity.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="font-medium mb-2">LED Matrix Control</p>
                            <div className="grid grid-cols-8 gap-1 p-2 bg-muted rounded-md aspect-square">
                                {ledPattern.map((color, i) => (
                                    <div key={i} className="w-full aspect-square rounded" style={{ backgroundColor: color }} />
                                ))}
                            </div>
                        </div>
                         <div>
                            <p className="font-medium mb-2">Cloud Data Log</p>
                             <div className="bg-muted text-sm font-mono p-3 rounded-md h-full min-h-[150px] text-muted-foreground">
                                {cloudLogs.map((log, i) => <p key={i}>{log}</p>)}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="text-center mt-8">
                <Button size="lg" onClick={handleAdjust} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                    Adjust with AI
                </Button>
            </div>
        </section>
    );
}
