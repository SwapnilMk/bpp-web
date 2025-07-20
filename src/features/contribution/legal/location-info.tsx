import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { locationSchema, LocationSchemaFormValues } from './schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { states } from '@/data/states';
import { Combobox } from '@/components/ui/combobox';

interface LocationInfoFormProps {
  onNext: (data: LocationSchemaFormValues) => void;
  onBack: () => void;
}

export function LocationInfoForm({ onNext, onBack }: LocationInfoFormProps) {
  const form = useForm<LocationSchemaFormValues>({
    resolver: zodResolver(locationSchema),
  });

  const onSubmit = (data: LocationSchemaFormValues) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Combobox
                  options={states.map((name) => ({ label: name, value: name }))}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pincode</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agreement"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to the terms and conditions
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="button" onClick={onBack}>Back</Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
