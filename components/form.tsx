"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "./ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { addPlayer } from "@/lib/actions/game";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});

export function FormPlayer() {
  const [score, setScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { name } = values;
    console.log(values, { score });

    const res = await addPlayer({ name, points: score });
    console.log(res);

    if (res)
      queryClient.invalidateQueries({
        queryKey: [`players`],
      });

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="">
          <Label>Score</Label>
          <Input
            placeholder="Score"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
          />
        </div>

        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
