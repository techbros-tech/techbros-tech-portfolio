"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Send } from "lucide-react"
import { useSendStore } from "@/store/use-send-store"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
})

const ContactForm = React.memo(() => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const openSendChoice = useSendStore((state) => state.openSendChoice)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        openSendChoice(values)
        setIsSubmitting(false)
    }

    return (
        <div className="w-full h-full flex flex-col justify-center p-6 md:p-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl">
            <div className="mb-8">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-audiowide">Get in Touch</h3>
                <p className="text-gray-400 mt-2 font-rajdhani text-lg">Send us a message and let's create something amazing.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white ml-1 font-orbitron text-xs tracking-widest uppercase">Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} className="bg-black/20 border-white/10 focus:border-emerald-500 text-white placeholder:text-gray-600 h-12 rounded-xl font-rajdhani text-lg" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white ml-1 font-orbitron text-xs tracking-widest uppercase">Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="john@example.com" {...field} className="bg-black/20 border-white/10 focus:border-emerald-500 text-white placeholder:text-gray-600 h-12 rounded-xl font-rajdhani text-lg" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white ml-1 font-orbitron text-xs tracking-widest uppercase">Your Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us about your project..."
                                        {...field}
                                        className="bg-black/20 border-white/10 focus:border-emerald-500 text-white placeholder:text-gray-600 min-h-[120px] rounded-xl resize-none font-rajdhani text-lg"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full h-12 bg-emerald-500 text-black hover:bg-emerald-400 rounded-xl font-audiowide text-lg transition-all" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                Send Message
                                <Send className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    )
})

ContactForm.displayName = "ContactForm";

export default ContactForm;
