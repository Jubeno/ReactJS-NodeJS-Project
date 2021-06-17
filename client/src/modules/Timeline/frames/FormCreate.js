import React, { useState } from 'react';
import ErrorLog from '../../../library/common/components/ErrorLog';
import { ERROR_MESSAGE, MAX_NUMBER_IMAGES } from '../../../library/common/constants';
import { Form, Button, Container, Row, Badge } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import '../timelineStyles.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingBar from '../../../library/common/components/LoadingBar/index.js';
import ImageUploading from "react-images-uploading";
import PreviewList from './PreviewList';
import { uploadPhotos, uploadContents } from '../../../library/api/HomeAPI';
import moment from 'moment';
import { getUserId } from '../../../library/utilities/util/retrieve';
import { v4 as uuidv4 } from 'uuid';

const FormCreate = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [time, setTime] = useState(new Date());
    const [images, setImages] = useState([]);
    const mutationUploadPhotos = useMutation('uploadPhotos',formData => uploadPhotos(formData));
    console.log('%c  mutationUploadPhotos:', 'color: #0e93e0;background: #aaefe5;', mutationUploadPhotos);
    const mutationUploadContents = useMutation('uploadContents', formData => uploadContents(formData))
    const userId = getUserId();

    const doUploadPhotos = (timelineId) => {
        const formData = new FormData();
        for(let i = 0; i < images.length; i++) {
            formData.append('files', images[i].file)
        }
        mutationUploadPhotos.mutate({
            formData,
            userId,
            timelineId
        });
    }

    const doUploadContents = data => {
        const formatTime = moment(time).valueOf();
        const originalTime = moment(formatTime).format('DD/MM/YYYY/HH/mm');
        const formattedData = {
            userId,
            title: data.title,
            time: `${formatTime}`,
            originalTime: originalTime,
            note: data.note, 
            timelineId: data.timelineId
        }
        mutationUploadContents.mutate(formattedData);
    }

    const onSubmit = data => {
        const timelineId = uuidv4();
        if(data.title !== '' & data.note !== '' & images.length > 0) {
            doUploadPhotos(timelineId);
            doUploadContents({note: data.note, timelineId, title: data.title });
        } else {
            toast.dark('Some information is missing, please fill it out!!', {
                autoClose: 4000
            })
        }
    };

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    const uploadSuccess = mutationUploadPhotos.status === "success" && mutationUploadPhotos.data.data.code === 0
    && mutationUploadContents.status === "success" && mutationUploadContents.data.data.code === 0;
    
    return (
        <>
            <LoadingBar status={mutationUploadPhotos.status}/>
            <Form encType="multipart/form-data" id="create-timeline" className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-4">
                    <Form.Label className="title">
                        Title &nbsp;
                        <Badge pill variant="danger">required</Badge>
                    </Form.Label>
                    <Form.Control
                        readOnly={uploadSuccess}
                        size="lg"
                        className="title-timeline"
                        placeholder="Title for this time!!"
                        { ...register('title') }
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="title">
                        Time 
                    </Form.Label>
                    <DatePicker
                        readOnly={uploadSuccess}
                        selected={time}
                        onChange={(time) => setTime(time)}
                        showTimeSelect
                        dateFormat="Pp"
                        className="datepicker"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="title">
                        Note &nbsp;
                        <Badge pill variant="danger">required</Badge>
                    </Form.Label>
                    <Form.Control
                        readOnly={uploadSuccess}
                        size="lg"
                        className="note-textarea"
                        placeholder="Take note for that moment!!"
                        as="textarea" rows={3}
                        { ...register('note') }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="title">
                        Images &nbsp;
                        <Badge pill variant="danger">required</Badge>
                    </Form.Label>
                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={MAX_NUMBER_IMAGES}
                        dataURLKey="data_url"
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps
                        }) => (
                            <>
                                {
                                    !uploadSuccess &&
                                        <div className="upload__image-wrapper" >
                                            {
                                                imageList.length < MAX_NUMBER_IMAGES &&
                                                    <div 
                                                        className="upload__button" 
                                                        onClick={onImageUpload}
                                                        {...dragProps}
                                                    >
                                                        Choose images
                                                    </div>
                                            }
                                            {
                                                imageList.length > 0 && 
                                                    <div
                                                        className="upload__button-remove" 
                                                        onClick={onImageRemoveAll}
                                                    >
                                                        Remove all images
                                                    </div>
                                            }
                                            <p className="upload__note">Upload up to {MAX_NUMBER_IMAGES} photos!!</p>
                                        </div>
                                }
                                <PreviewList 
                                    onImageUpdate={onImageUpdate}
                                    onImageRemove={onImageRemove}
                                    imageList={imageList}
                                    uploadSuccess={uploadSuccess}
                                />
                            </>
                        )}
                    </ImageUploading>
                </Form.Group>
                <div className="button-area">
                    {
                        uploadSuccess
                        ? <p className="uploadsuccess__note">
                            Congratulation!! You've already uploaded all of your information!
                            <br/>
                            Please click "Add one more" to continue creating your timeline!!
                        </p> 
                        :<Button 
                            size="lg" 
                            className="buttonSubmit"
                            variant="danger" 
                            type="submit"
                            disabled={mutationUploadPhotos.status === "loading"}
                        >
                            Submit
                        </Button>
                    }
                    
                </div>
            </Form>
        </>
    );
}

export default FormCreate;