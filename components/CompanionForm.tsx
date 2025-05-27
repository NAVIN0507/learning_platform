"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
const formSchema = z.object({
  name: z.string().min(1 , {message:'Companion is required'}),
  subject: z.string().min(1 , {message:'Subject is required'}),
  topic: z.string().min(1 , {message:'Topic is required'}),
  voice: z.string().min(1 , {message:'Voice is required'}),
  style: z.string().min(1 , {message:'Style is required'}),
  duration: z.coerce.number().min(1 , {message:'Duration is required'}),
})
const CompanionForm = () => {
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
        console.log(values)
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
              <Input placeholder="Enter Your Companion Name" {...field} className="input"/>
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
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
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  )
}

export default CompanionForm