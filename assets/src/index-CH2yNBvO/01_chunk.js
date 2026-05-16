/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PS=i=>i.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),XS=i=>i.replace(/^([A-Z])|[\s-_]+(\w)/g,(s,o,l)=>l?l.toUpperCase():o.toLowerCase()),qp=i=>{const s=XS(i);return s.charAt(0).toUpperCase()+s.slice(1)},cy=(...i)=>i.filter((s,o,l)=>!!s&&s.trim()!==""&&l.indexOf(s)===o).join(" ").trim(),KS=i=>{for(const s in i)if(s.startsWith("aria-")||s==="role"||s==="title")return!0};
