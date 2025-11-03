/* eslint-disable */
// @ts-ignore
import { CarsList } from "../components/CarList";
import { CreateCarForm } from "../components/CreateCarForm";
import StellarExpertLink from "../components/StellarExpertLink";
import useModal from "../hooks/useModal";
import { ICar } from "../interfaces/car";
import { CarStatus } from "../interfaces/car-status";
import { CreateCar } from "../interfaces/create-car";
import { UserRole } from "../interfaces/user-role";
import { stellarService } from "../services/stellar.service";
import { walletService } from "../services/wallet.service";
import { useStellarAccounts } from "../stellar/StellarAccountProvider";
import { ONE_XLM_IN_STROOPS } from "../utils/xlm-in-stroops";

export default function Dashboard() {
  const { hashId, cars, walletAddress, setCars, setHashId, selectedRole } =
    useStellarAccounts();
  const { showModal, openModal, closeModal } = useModal();

  const handleCreateCar = async (formData: CreateCar) => {
    const { brand, model, color, passengers, pricePerDay, ac, ownerAddress } =
      formData;
    const contractClient =
      await stellarService.buildClient<unknown>(walletAddress);

    const addCarResult = await contractClient.add_car({
      owner: ownerAddress,
      price_per_day: pricePerDay * ONE_XLM_IN_STROOPS,
    });
    const xdr = addCarResult.toXDR();

    const signedTx = await walletService.signTransaction(xdr);
    const txHash = await stellarService.submitTransaction(signedTx.signedTxXdr);

    const newCar: ICar = {
      brand,
      model,
      color,
      passengers,
      pricePerDay,
      ac,
      ownerAddress,
      status: CarStatus.AVAILABLE,
    };

    setCars((prevCars) => [...prevCars, newCar]);
    setHashId(txHash as string);
    closeModal();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" data-test="dashboard-title">
          Cars Catalog
        </h1>
        {selectedRole === UserRole.ADMIN && (
          <button
            onClick={openModal}
            className="group px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-xl disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:transform-none cursor-pointer"
          >
            <span className="flex items-center gap-2">Add Car</span>
          </button>
        )}
      </div>

      {cars && <CarsList cars={cars} />}

      {showModal && (
        <CreateCarForm onCreateCar={handleCreateCar} onCancel={closeModal} />
      )}

      {hashId && <StellarExpertLink url={hashId} />}
    </div>
  );
}
