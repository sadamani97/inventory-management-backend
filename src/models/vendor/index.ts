import { Vendor } from "./vendor.model.js";
import { VendorType } from "./vendorType.model.js";
import { Country } from "./countries.model.js";
import { State } from "./states.model.js";
import { City } from "./cities.model.js";
import { Address } from "./address.model.js";
import { VendorContact } from "./vendorContact.model.js";
import { VendorBankDetails } from "./vendorBankDetails.model.js";

// Vendor Relationships
Vendor.belongsTo(VendorType, { foreignKey: "vendorTypeId", as: "vendorType" });
VendorType.hasMany(Vendor, { foreignKey: "vendorTypeId", as: "vendors" });

Vendor.hasMany(Address, { foreignKey: "vendorId", as: "addresses" });
Address.belongsTo(Vendor, { foreignKey: "vendorId", as: "vendor" });

Vendor.hasMany(VendorContact, { foreignKey: "vendorId", as: "contacts" });
VendorContact.belongsTo(Vendor, { foreignKey: "vendorId", as: "vendor" });

Vendor.hasMany(VendorBankDetails, { foreignKey: "vendorId", as: "bankDetails" });
VendorBankDetails.belongsTo(Vendor, { foreignKey: "vendorId", as: "vendor" });

// Location Hierarchy
Address.belongsTo(City, { foreignKey: "cityId", as: "city" });
Address.belongsTo(State, { foreignKey: "stateId", as: "state" });
Address.belongsTo(Country, { foreignKey: "countryId", as: "country" });

City.belongsTo(State, { foreignKey: "stateId", as: "state" });
State.belongsTo(Country, { foreignKey: "countryId", as: "country" });

Country.hasMany(State, { foreignKey: "countryId", as: "states" });
State.hasMany(City, { foreignKey: "stateId", as: "cities" });
City.hasMany(Address, { foreignKey: "cityId", as: "addresses" });

export {
    Vendor,
    VendorType,
    Country,
    State,
    City,
    Address,
    VendorContact,
    VendorBankDetails,
};