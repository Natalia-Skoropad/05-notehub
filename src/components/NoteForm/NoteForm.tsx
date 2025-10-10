import { useId } from 'react';

import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from 'formik';

import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '../../services/noteService';
import type { NoteTag } from '../../types/note';
import { Button } from '../../index';

import css from './NoteForm.module.css';

//===============================================================

const TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
}

const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

//===============================================================

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title too short')
    .max(50, 'Title too long')
    .required('Title is required'),

  content: Yup.string().max(500, 'Content too long'),

  tag: Yup.mixed<NoteFormValues['tag']>()
    .oneOf(TAGS, 'Invalid tag')
    .required('Select tag'),
});

//===============================================================

function NoteForm({ onCancel, onSuccess }: NoteFormProps) {
  const fieldId = useId();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onSuccess?.();
    },
  });

  const handleSubmit = async (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>
  ) => {
    await mutateAsync(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur
      validateOnChange
    >
      {({ isValid, dirty }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <Field
              type="text"
              name="title"
              id={`${fieldId}-title`}
              className={css.input}
            />
            <FormikErrorMessage
              name="title"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <Field
              as="textarea"
              name="content"
              id={`${fieldId}-content`}
              rows={8}
              className={css.textarea}
            />
            <FormikErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <Field
              as="select"
              name="tag"
              id={`${fieldId}-tag`}
              className={css.select}
            >
              {TAGS.map(t => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Field>
            <FormikErrorMessage
              name="tag"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.actions}>
            <Button
              type="button"
              text="Cancel"
              variant="cancel"
              onClick={onCancel}
            />
            <Button
              type="submit"
              text="Create note"
              variant="normal"
              disabled={isPending || !isValid || !dirty}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default NoteForm;
