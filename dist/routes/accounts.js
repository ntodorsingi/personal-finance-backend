"use strict";
// src/routes/accounts.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accountsController_1 = require("../controllers/accountsController");
const router = express_1.default.Router();
// Ruta za dobijanje svih naloga
router.get('/accounts', accountsController_1.getAccounts);
// Ruta za kreiranje novog naloga
router.post('/accounts', accountsController_1.createAccount);
exports.default = router;
