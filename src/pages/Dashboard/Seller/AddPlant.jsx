import { Helmet } from 'react-helmet-async'
import AddPlantForm from '../../../components/Form/AddPlantForm'
import { imageUpload } from '../../../api/imageUpload';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import { axiosSecure } from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddPlant = () => {
  const { user } = useAuth();
  const [uploadName, setUploadName] = useState('Upload Photo');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const name = form.name.value
    const category = form.category.value
    const description = form.description.value
    const price = parseFloat(form.price.value)
    const quantity = parseInt(form.quantity.value)
    const image = form.image.files[0]
    const imageUrl = await imageUpload(image)

    /// seller info 
    const sellerInfo = {
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
    }

    const plantInfo = { name, category, description, price, quantity, imageUrl, sellerInfo: sellerInfo }

    // post the plant info form the db ==============>>>>>>>>>>>>>

    try {
      const { data } = await axiosSecure.post(`/plants`, plantInfo)
      if (data) {
        toast.success("Plants Posted successfully!")
        setTimeout(() => {
          navigate(`/`)
        }, 2000)
      }
    } catch {
      toast.error('Failed to add plant. Please try again.')
    }finally{
      setLoading(false);
    }

  }

  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm handleSubmit={handleSubmit} uploadName={uploadName} setUploadName={setUploadName} loading={loading} />
    </div>
  )
}

export default AddPlant
