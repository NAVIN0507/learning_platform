"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { subjects } from "@/constants"
import { Textarea } from "./ui/textarea"
import { createCompanion } from "@/lib/companion.action"
import { redirect } from "next/navigation"
const formSchema = z.object({
  name: z.string().min(1 , {message:'Companion is required'}),
  subject: z.string().min(1 , {message:'Subject is required'}),
  topic: z.string().min(1 , {message:'Topic is required'}),
  voice: z.string().min(1 , {message:'Voice is required'}),
  style: z.string().min(1 , {message:'Style is required'}),
  duration: z.coerce.number().min(1 , {message:'Duration is required'}),
})
const CompanionForm = (userId:string) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:"",
            subject:"",
            topic:"",
            voice:"",
            style:"",
            duration:15,
        },
      })
     
      // 2. Define a submit handler.
      const onSubmit =  async(values: z.infer<typeof formSchema>)=> {
        const addCompanion = await createCompanion(values);
        if(addCompanion){
            redirect(`/companions/${addCompanion.id}`)
        }
        else{
            console.log("Failed to Create Complanion")
        }
      }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Companion Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter Your Companion Name" {...field} className="input"/>
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="subject"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subject</FormLabel>
            <FormControl>
            <Select
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
            >
  <SelectTrigger className="input capitalize">
    <SelectValue placeholder="Select the subject" />
  </SelectTrigger>
  <SelectContent>
{subjects.map((subject)=>(
    <SelectItem value={subject} key={subject} className="capitalize">{subject}</SelectItem>
))}
  </SelectContent>
</Select>
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="topic"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What Should the companion help with?</FormLabel>
            <FormControl>
              <Textarea rows={7} placeholder="Ex. Stack, Queue and Linked List" {...field} className="input"/>
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
         <FormField
        control={form.control}
        name="voice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Voice</FormLabel>
            <FormControl>
            <Select
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
            >
            <SelectTrigger className="input">
                <SelectValue placeholder="Select the Voice" />
            </SelectTrigger>
            <SelectContent>
           <SelectItem value="male">Male</SelectItem>
           <SelectItem value="female">Female</SelectItem>
  </SelectContent>
</Select>
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
         <FormField
        control={form.control}
        name="style"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Voice Style</FormLabel>
            <FormControl>
            <Select
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
            >
  <SelectTrigger className="input">
    <SelectValue placeholder="Select the voice style" />
  </SelectTrigger>
  <SelectContent>
  <SelectItem value="formal">Formal</SelectItem>
  <SelectItem value="casual">Casual</SelectItem>
  </SelectContent>
</Select>
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estimated session duration in minutes</FormLabel>
            <FormControl>
              <Input placeholder="15" type="number" {...field} className="input"/>
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="w-full cursor-pointer bg-orange-500">Build your Companion</Button>
    </form>
  </Form>
  )
}

export default CompanionForm