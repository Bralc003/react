import { Button, Stack, TextField } from "@mui/material";
import { MeasurementCategory } from "@/components/Measurements/models/Category";
import { useAddMeasurementCategoryQuery, useEditMeasurementCategoryQuery } from "@/components/Measurements/queries";
import { Form, Formik } from "formik";
import React from 'react';
import { useTranslation } from "react-i18next";
import * as yup from 'yup';

interface CategoryFormProps {
    category?: MeasurementCategory,
    closeFn?: () => void,
}

export const CategoryForm = ({ category, closeFn }: CategoryFormProps) => {

    const [t] = useTranslation();
    const useAddCategoryQuery = useAddMeasurementCategoryQuery();
    const useEditCategoryQuery = useEditMeasurementCategoryQuery(category?.id || 0);
    const validationSchema = yup.object({
        group: yup
            .string()
            .required(t('forms.fieldRequired'))
            .max(20, t('forms.maxLength', { chars: '20' }))
            .min(3, t('forms.minLength', { chars: '3' })),
        name: yup
            .string()
            .required(t('forms.fieldRequired'))
            .max(20, t('forms.maxLength', { chars: '20' }))
            .min(3, t('forms.minLength', { chars: '3' })),
        unit: yup
            .string()
            .required(t('forms.fieldRequired'))
            .max(5, t('forms.maxLength', { chars: '5' }))
    });


    return (
        <Formik
            initialValues={{
                group: category ? category.group_name : "",
                name: category ? category.name : "",
                unit: category ? category.unit : "",
                
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                const payload = {
                    name: values.name,
                    unit: values.unit,
                    group: values.group,
                };
                // Edit existing weight entry
                if (category) {
                    useEditCategoryQuery.mutate({ ...payload, id: category.id });
                } else {
                    useAddCategoryQuery.mutate(payload);
                }

                // if closeFn is defined, close the modal (this form does not have to
                // be displayed in a modal)
                if (closeFn) {
                    closeFn();
                }
            }}
        >
            {formik => (
                <Form>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            id="group"
                            label={t('Group')}
                            error={formik.touched.group && Boolean(formik.touched.group)}
                            helperText={formik.touched.group && formik.errors.group}
                            {...formik.getFieldProps('group')}
                        />
                        <TextField
                            fullWidth
                            id="name"
                            label={t('name')}
                            error={formik.touched.name && Boolean(formik.touched.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            {...formik.getFieldProps('name')}
                        />
                        <TextField
                            fullWidth
                            id="unit"
                            label={t('unit')}
                            error={formik.touched.unit && Boolean(formik.errors.unit)}
                            helperText={
                                formik.touched.unit && formik.errors.unit
                                    ? formik.errors.unit
                                    : t('measurements.unitFormHelpText')
                            }
                            {...formik.getFieldProps('unit')}
                        />
                        <Stack direction="row" sx={{ justifyContent: "end", mt: 2 }}>
                            <Button color="primary" variant="contained" type="submit" sx={{ mt: 2 }}>
                                {t('submit')}
                            </Button>
                        </Stack>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};
