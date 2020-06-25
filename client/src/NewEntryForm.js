import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createEntry } from './API'

const NewEntryForm = ({ location, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            await createEntry(data);
            onClose();
        } catch (error) {
            console.log(error)
            setError(error.message);
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="entryForm">
            {error ? <h3 className='error'>{error}</h3> : null}
            <h3 id='formTitle'>New Entry:</h3>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" required ref={register} />
            <label htmlFor="comments">Comments</label>
            <textarea name="comments" rows={4} ref={register}></textarea>
            <label htmlFor="desc">Desciption</label>
            <textarea name="desc" rows={4} ref={register}></textarea>
            <label htmlFor="image">Image</label>
            <input name="image" ref={register} />
            <label htmlFor="visitDate">Visit Date</label>
            <input type="date" name="visitDate" required ref={register} />
            <button disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
        </form>
    );
};

export default NewEntryForm;