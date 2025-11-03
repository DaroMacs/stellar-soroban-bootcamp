import { Heading, Icon, Text } from "@stellar/design-system";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../interfaces/user-role";
import { useStellarAccounts } from "../stellar/StellarAccountProvider";

export default function RoleSelection() {
  const { setSelectedRole, selectedRole } = useStellarAccounts();
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    localStorage.setItem("role", role);
    setSelectedRole(role);

    void navigate("/cars");
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <Heading as="h1" size="lg">
            Select your role
          </Heading>
          <Text size="lg" as="p">
            Do you want to hire a vehicle, put yours up for hire, or withdraw
            your earnings?
          </Text>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={() => handleRoleSelect(UserRole.ADMIN)}
            className={`group relative p-8 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${
              selectedRole === UserRole.ADMIN
                ? "border-purple-600 bg-purple-50 shadow-xl shadow-purple-200"
                : "border-gray-200 bg-white hover:border-purple-400 hover:shadow-xl hover:shadow-purple-100"
            }`}
          >
            <div className="space-y-4">
              <div
                className={`inline-block p-4 rounded-full transition-all duration-300 ${
                  selectedRole === UserRole.ADMIN
                    ? "bg-purple-100"
                    : "bg-purple-50 group-hover:bg-purple-100"
                }`}
              >
                <Icon.UserSquare
                  className={`w-12 h-12 transition-colors duration-300 ${
                    selectedRole === UserRole.ADMIN
                      ? "text-purple-600"
                      : "text-purple-500 group-hover:text-purple-600"
                  }`}
                />
              </div>
              <Heading as="h2" size="md" className="text-gray-900">
                Admin
              </Heading>
              <Text size="lg" as="p" className="text-gray-600">
                Create the cars for hire and you can remove them.
              </Text>
            </div>
          </button>

          <button
            onClick={() => handleRoleSelect(UserRole.OWNER)}
            className={`group relative p-8 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${
              selectedRole === UserRole.OWNER
                ? "border-green-600 bg-green-50 shadow-xl shadow-green-200"
                : "border-gray-200 bg-white hover:border-green-400 hover:shadow-xl hover:shadow-green-100"
            }`}
          >
            <div className="space-y-4">
              <div
                className={`inline-block p-4 rounded-full transition-all duration-300 ${
                  selectedRole === UserRole.OWNER
                    ? "bg-green-100"
                    : "bg-green-50 group-hover:bg-green-100"
                }`}
              >
                <Icon.Car01
                  className={`w-12 h-12 transition-colors duration-300 ${
                    selectedRole === UserRole.OWNER
                      ? "text-green-600"
                      : "text-green-500 group-hover:text-green-600"
                  }`}
                />
              </div>
              <Heading as="h2" size="md" className="text-gray-900">
                Owner
              </Heading>
              <Text size="lg" as="p" className="text-gray-600">
                Check the status of your car and collect the profits generated
              </Text>
            </div>
          </button>

          <button
            onClick={() => handleRoleSelect(UserRole.RENTER)}
            className={`group relative p-8 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${
              selectedRole === UserRole.RENTER
                ? "border-blue-600 bg-blue-50 shadow-xl shadow-blue-200"
                : "border-gray-200 bg-white hover:border-blue-400 hover:shadow-xl hover:shadow-blue-100"
            }`}
          >
            <div className="space-y-4">
              <div
                className={`inline-block p-4 rounded-full transition-all duration-300 ${
                  selectedRole === UserRole.RENTER
                    ? "bg-blue-100"
                    : "bg-blue-50 group-hover:bg-blue-100"
                }`}
              >
                <Icon.UserCircle
                  className={`w-12 h-12 transition-colors duration-300 ${
                    selectedRole === UserRole.RENTER
                      ? "text-blue-600"
                      : "text-blue-500 group-hover:text-blue-600"
                  }`}
                />
              </div>
              <Heading as="h2" size="md" className="text-gray-900">
                Renter
              </Heading>
              <Text as="p" size="lg" className="text-gray-600">
                Browse available vehicles and hire the one you need in a
                transparent manner
              </Text>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
