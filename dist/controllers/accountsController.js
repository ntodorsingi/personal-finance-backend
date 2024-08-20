"use strict";
// src/controllers/accountsController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccount = exports.getAccounts = void 0;
const getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ovdje dodajte kod za dobijanje naloga iz baze
        res.json({ accounts: [] }); // Primer odgovora
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getAccounts = getAccounts;
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ovdje dodajte kod za kreiranje novog naloga
        res.status(201).json({ message: 'Account created' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.createAccount = createAccount;
