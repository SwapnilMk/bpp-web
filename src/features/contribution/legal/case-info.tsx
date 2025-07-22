import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { CaseRegistrationFormValues } from '@/features/contribution/legal/schema/case-registration';
import { useFormContext, Controller } from 'react-hook-form';
import { DatePicker } from '@/components/features/DatePicker';
import { FileUpload, FileUploadDropzone, FileUploadList, FileUploadItem, FileUploadItemPreview, FileUploadItemMetadata, FileUploadItemDelete, FileUploadTrigger } from '@/components/ui/file-upload';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

export function CaseRegistrationForm({ typeOfSupport, category }: { typeOfSupport?: string, category?: string }) {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CaseRegistrationFormValues>();
  const [briefCharCount, setBriefCharCount] = useState(0);
  const briefValue = watch('briefYourCase') || '';

  React.useEffect(() => {
    setBriefCharCount(briefValue.length);
  }, [briefValue]);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">Register your Case</CardTitle>
        <CardDescription className="py-2 text-muted-foreground">Case Registration</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="space-y-8 text-start">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="typeOfSupport" className="block text-sm font-medium text-primary">
                Type of Support <span className="text-destructive">*</span>
              </Label>
              <Input
                id="typeOfSupport"
                {...register('typeOfSupport')}
                className="block p-2 w-full rounded-md border"
                value={typeOfSupport !== undefined ? typeOfSupport : undefined}
                disabled={!!typeOfSupport}
              />
              {errors.typeOfSupport && (
                <span className="text-sm text-destructive">{errors.typeOfSupport.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="category" className="block text-sm font-medium text-primary">
                Category <span className="text-destructive">*</span>
              </Label>
              <Input
                id="category"
                {...register('category')}
                className="block p-2 w-full rounded-md border"
                value={category !== undefined ? category : undefined}
                disabled={!!category}
              />
              {errors.category && (
                <span className="text-sm text-destructive">{errors.category.message}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="typeOfCase" className="block text-sm font-medium text-primary">
                Type of Case <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="typeOfCase"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a case type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Criminal Cases">Criminal Cases</SelectItem>
                      <SelectItem value="Civil Cases">Civil Cases</SelectItem>
                      <SelectItem value="Constitutional Cases">Constitutional Cases</SelectItem>
                      <SelectItem value="Administrative Cases">Administrative Cases</SelectItem>
                      <SelectItem value="Family Law Cases">Family Law Cases</SelectItem>
                      <SelectItem value="Commercial Cases">Commercial Cases</SelectItem>
                      <SelectItem value="Labor and Employment Cases">Labor and Employment Cases</SelectItem>
                      <SelectItem value="Environmental Cases">Environmental Cases</SelectItem>
                      <SelectItem value="Property Cases">Property Cases</SelectItem>
                      <SelectItem value="Consumer Cases">Consumer Cases</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.typeOfCase && (
                <span className="text-sm text-destructive">{errors.typeOfCase.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="dateOfDispute" className="block text-sm font-medium text-primary">
                Date of Dispute <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="dateOfDispute"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    date={field.value ? new Date(field.value) : undefined}
                    setDate={date => field.onChange(date ? date.toISOString().slice(0, 10) : undefined)}
                  />
                )}
              />
              {errors.dateOfDispute && (
                <span className="text-sm text-destructive">{errors.dateOfDispute.message}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="briefYourCase" className="block text-sm font-medium text-primary">
              Brief your case <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="briefYourCase"
              maxLength={2000}
              {...register('briefYourCase', {
                maxLength: { value: 2000, message: 'Maximum 2000 characters allowed' }
              })}
              className="min-h-[120px]"
              rows={6}
              onChange={e => {
                setValue('briefYourCase', e.target.value);
                setBriefCharCount(e.target.value.length);
              }}
            />
            <div className="mt-1 text-xs text-right text-muted-foreground">{briefCharCount}/2000</div>
            {errors.briefYourCase && (
              <span className="text-sm text-destructive">{errors.briefYourCase.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="additionalDocument" className="block text-sm font-medium text-primary">
              Additional Document
            </Label>
            <Controller
              name="additionalDocument"
              control={control}
              render={({ field }) => (
                <FileUpload
                  value={field.value ? Array.from(field.value) : []}
                  onValueChange={files => {
                    const dt = new DataTransfer();
                    files.forEach(file => dt.items.add(file));
                    field.onChange(dt.files);
                  }}
                  accept={'.pdf,.jpg,.jpeg,.png'}
                  maxFiles={1}
                  maxSize={5 * 1024 * 1024}
                >
                  <FileUploadDropzone className="flex-row flex-wrap px-3 py-4 h-auto text-center rounded-md border-dotted transition-colors bg-muted/30 hover:bg-muted/50">
                    <FileUploadTrigger asChild>
                      <Button variant="link" size="sm" className="p-0 h-auto">
                        Upload
                      </Button>
                    </FileUploadTrigger>
                  </FileUploadDropzone>
                  <FileUploadList>
                    {field.value && Array.from(field.value).map((file: File) => (
                      <FileUploadItem key={file.name} value={file}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                          <Button variant="ghost" size="icon" className="size-7">
                            <X />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </FileUploadItemDelete>
                      </FileUploadItem>
                    ))}
                  </FileUploadList>
                </FileUpload>
              )}
            />
            {errors.additionalDocument && (
              <span className="text-sm text-destructive">{errors.additionalDocument.message as string}</span>
            )}
          </div>

          <div className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="financialAid" className="block text-sm font-medium text-primary">
                Financial Aid
              </Label>
              <Controller
                name="financialAid"
                control={control}
                defaultValue="no"
                render={({ field }) => (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="financialAidYes"
                        checked={field.value === "yes"}
                        onCheckedChange={() => {}}
                        disabled
                      />
                      <Label htmlFor="financialAidYes" className="text-muted-foreground">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="financialAidNo"
                        checked={field.value === "no"}
                        onCheckedChange={() => field.onChange("no")}
                      />
                      <Label htmlFor="financialAidNo">No</Label>
                    </div>
                  </div>
                )}
              />
              <div className="mt-1 text-sm text-red-600">Financial Aid Currently unavailable</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
