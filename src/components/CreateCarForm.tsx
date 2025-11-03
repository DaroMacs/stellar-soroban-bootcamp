import { useState } from "react";
import { CreateCar } from "../interfaces/create-car";
import Modal from "./Modal";

interface CreateCarFormProps {
  onCreateCar: (formData: CreateCar) => Promise<void>;
  onCancel: () => void;
}

export const CreateCarForm = ({
  onCreateCar,
  onCancel,
}: CreateCarFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateCar>({
    brand: "",
    model: "",
    color: "",
    passengers: 1,
    pricePerDay: 0,
    ac: false,
    ownerAddress: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onCreateCar(formData);
    } catch (error) {
      console.error("Error creating car:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal title="Create New Car" closeModal={onCancel}>
      <div className="bg-white rounded-lg px-8">
        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Brand
            </label>
            <input
              id="brand"
              name="brand"
              type="text"
              value={formData.brand}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1"
            />
          </div>

          <div>
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-700"
            >
              Model
            </label>
            <input
              id="model"
              name="model"
              type="text"
              value={formData.model}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1"
            />
          </div>

          <div>
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700"
            >
              Color
            </label>
            <input
              id="color"
              name="color"
              type="text"
              value={formData.color}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1"
            />
          </div>

          <div>
            <label
              htmlFor="passengers"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Passengers
            </label>
            <input
              id="passengers"
              name="passengers"
              type="number"
              min="1"
              max="10"
              value={formData.passengers}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1"
            />
          </div>

          <div>
            <label
              htmlFor="pricePerDay"
              className="block text-sm font-medium text-gray-700"
            >
              Price per Day
            </label>
            <input
              id="pricePerDay"
              name="pricePerDay"
              type="number"
              min="0"
              value={formData.pricePerDay}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1"
            />
          </div>

          <div>
            <label
              htmlFor="ownerAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Owner Address
            </label>
            <input
              id="ownerAddress"
              name="ownerAddress"
              type="text"
              value={formData.ownerAddress}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1"
            />
          </div>

          <div className="flex items-center">
            <input
              id="ac"
              name="ac"
              type="checkbox"
              checked={formData.ac}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="ac" className="ml-2 block text-sm text-gray-700">
              Air Conditioning
            </label>
          </div>

          <div className="flex justify-end gap-4 space-x-3 pt-2 pb-6">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 cursor-pointer"
            >
              {isSubmitting ? "Creating..." : "Create Car"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
