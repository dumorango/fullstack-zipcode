import { useState } from "react";
import "./App.css";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { FindPlaces } from "./__generated__/FindPlaces";
import { placeHistoryVar } from "./apollo";

function App() {
  const [countryCode, setCountryCode] = useState("US");
  const [zipCode, setZipCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="App">
      <h1>Find Places</h1>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          setSubmitted(true);
        }}
      >
        <label>Country Code</label>
        <select
          value={countryCode}
          onChange={(evt) => {
            setSubmitted(false);
            setCountryCode(evt.target.value);
          }}
          name="country"
        >
          <option value="US"> United States</option>
          <option value="CA"> Canada</option>
          <option value="AD"> Andorra</option>
          <option value="AS"> Argentina</option>
          <option value="AM"> America Samoa</option>
          <option value="AU"> Australia</option>
          <option value="AT"> Austria</option>
          <option value="BE"> Belgium</option>
          <option value="BR"> Brazil</option>
          <option value="BG"> Bulgaria</option>
          <option value="BF"> Burkina Faso</option>
          <option value="BI"> Burundi</option>
          <option value="CV"> Cabo Verde</option>
          <option value="KH"> Cambodia</option>
          <option value="CM"> Cameroon</option>
          <option value="KY"> Cayman Islands</option>
          <option value="CF"> Central African Republic</option>
          <option value="TD"> Chad</option>
          <option value="CL"> Chile</option>
          <option value="CN"> China</option>
          <option value="CX"> Christmas Island</option>
          <option value="CC"> Cocos (Keeling) Islands</option>
          <option value="CO"> Colombia</option>
          <option value="KM"> Comoros</option>
          <option value="CG"> Congo Republic</option>
          <option value="CK"> Cook Islands</option>
          <option value="CR"> Costa Rica</option>
          <option value="HR"> Croatia</option>
          <option value="CU"> Cuba</option>
          <option value="CW"> Curaçao</option>
          <option value="CY"> Cyprus</option>
          <option value="CZ"> Czechia</option>
          <option value="CD"> DR Congo</option>
          <option value="DK"> Denmark</option>
          <option value="DJ"> Djibouti</option>
          <option value="DM"> Dominica</option>
          <option value="DO"> Dominican Republic</option>
          <option value="EC"> Ecuador</option>
          <option value="EG"> Egypt</option>
          <option value="SV"> El Salvador</option>
          <option value="GQ"> Equatorial Guinea</option>
          <option value="ER"> Eritrea</option>
          <option value="EE"> Estonia</option>
          <option value="SZ"> Eswatini</option>
          <option value="ET"> Ethiopia</option>
          <option value="FK"> Falkland Islands</option>
          <option value="FO"> Faroe Islands</option>
          <option value="FJ"> Fiji</option>
          <option value="FI"> Finland</option>
          <option value="FR"> France</option>
          <option value="GF"> French Guiana</option>
          <option value="PF"> French Polynesia</option>
          <option value="TF"> French Southern Territories</option>
          <option value="GA"> Gabon</option>
          <option value="GE"> Georgia</option>
          <option value="DE"> Germany</option>
          <option value="GH"> Ghana</option>
          <option value="GI"> Gibraltar</option>
          <option value="GR"> Greece</option>
          <option value="GL"> Greenland</option>
          <option value="GD"> Grenada</option>
          <option value="GP"> Guadeloupe</option>
          <option value="GU"> Guam</option>
          <option value="GT"> Guatemala</option>
          <option value="GG"> Guernsey</option>
          <option value="GN"> Guinea</option>
          <option value="GW"> Guinea-Bissau</option>
          <option value="GY"> Guyana</option>
          <option value="HT"> Haiti</option>
          <option value="HM"> Heard and McDonald Islands</option>
          <option value="HN"> Honduras</option>
          <option value="HK"> Hong Kong</option>
          <option value="HU"> Hungary</option>
          <option value="IS"> Iceland</option>
          <option value="IN"> India</option>
          <option value="ID"> Indonesia</option>
          <option value="IR"> Iran</option>
          <option value="IQ"> Iraq</option>
          <option value="IE"> Ireland</option>
          <option value="IM"> Isle of Man</option>
          <option value="IL"> Israel</option>
          <option value="IT"> Italy</option>
          <option value="CI"> Ivory Coast</option>
          <option value="JM"> Jamaica</option>
          <option value="JP"> Japan</option>
          <option value="JE"> Jersey</option>
          <option value="JO"> Jordan</option>
          <option value="KZ"> Kazakhstan</option>
          <option value="KE"> Kenya</option>
          <option value="KI"> Kiribati</option>
          <option value="XK"> Kosovo</option>
          <option value="KW"> Kuwait</option>
          <option value="KG"> Kyrgyzstan</option>
          <option value="LA"> Laos</option>
          <option value="LV"> Latvia</option>
          <option value="LB"> Lebanon</option>
          <option value="LS"> Lesotho</option>
          <option value="LR"> Liberia</option>
          <option value="LY"> Libya</option>
          <option value="LI"> Liechtenstein</option>
          <option value="LT"> Lithuania</option>
          <option value="LU"> Luxembourg</option>
          <option value="MO"> Macao</option>
          <option value="MG"> Madagascar</option>
          <option value="MW"> Malawi</option>
          <option value="MY"> Malaysia</option>
          <option value="MV"> Maldives</option>
          <option value="ML"> Mali</option>
          <option value="MT"> Malta</option>
          <option value="MH"> Marshall Islands</option>
          <option value="MQ"> Martinique</option>
          <option value="MR"> Mauritania</option>
          <option value="MU"> Mauritius</option>
          <option value="YT"> Mayotte</option>
          <option value="MX"> Mexico</option>
          <option value="FM"> Micronesia</option>
          <option value="MD"> Moldova</option>
          <option value="MC"> Monaco</option>
          <option value="MN"> Mongolia</option>
          <option value="ME"> Montenegro</option>
          <option value="MS"> Montserrat</option>
          <option value="MA"> Morocco</option>
          <option value="MZ"> Mozambique</option>
          <option value="MM"> Myanmar</option>
          <option value="NA"> Namibia</option>
          <option value="NR"> Nauru</option>
          <option value="NP"> Nepal</option>
          <option value="NL"> Netherlands</option>
          <option value="NC"> New Caledonia</option>
          <option value="NZ"> New Zealand</option>
          <option value="NI"> Nicaragua</option>
          <option value="NE"> Niger</option>
          <option value="NG"> Nigeria</option>
          <option value="NU"> Niue</option>
          <option value="NF"> Norfolk Island</option>
          <option value="KP"> North Korea</option>
          <option value="MK"> North Macedonia</option>
          <option value="MP"> Northern Mariana Islands</option>
          <option value="NO"> Norway</option>
          <option value="OM"> Oman</option>
          <option value="PK"> Pakistan</option>
          <option value="PW"> Palau</option>
          <option value="PS"> Palestine</option>
          <option value="PA"> Panama</option>
          <option value="PG"> Papua New Guinea</option>
          <option value="PY"> Paraguay</option>
          <option value="PE"> Peru</option>
          <option value="PH"> Philippines</option>
          <option value="PN"> Pitcairn Islands</option>
          <option value="PL"> Poland</option>
          <option value="PT"> Portugal</option>
          <option value="PR"> Puerto Rico</option>
          <option value="QA"> Qatar</option>
          <option value="RO"> Romania</option>
          <option value="RU"> Russia</option>
          <option value="RW"> Rwanda</option>
          <option value="RE"> Réunion</option>
          <option value="BL"> Saint Barthélemy</option>
          <option value="SH"> Saint Helena</option>
          <option value="LC"> Saint Lucia</option>
          <option value="MF"> Saint Martin</option>
          <option value="PM"> Saint Pierre and Miquelon</option>
          <option value="WS"> Samoa</option>
          <option value="SM"> San Marino</option>
          <option value="SA"> Saudi Arabia</option>
          <option value="SN"> Senegal</option>
          <option value="RS"> Serbia</option>
          <option value="SC"> Seychelles</option>
          <option value="SL"> Sierra Leone</option>
          <option value="SG"> Singapore</option>
          <option value="SX"> Sint Maarten</option>
          <option value="SK"> Slovakia</option>
          <option value="SI"> Slovenia</option>
          <option value="SB"> Solomon Islands</option>
          <option value="SO"> Somalia</option>
          <option value="ZA"> South Africa</option>
          <option value="GS"> South Georgia and South Sandwich Islands</option>
          <option value="KR"> South Korea</option>
          <option value="SS"> South Sudan</option>
          <option value="ES"> Spain</option>
          <option value="LK"> Sri Lanka</option>
          <option value="KN"> St Kitts and Nevis</option>
          <option value="VC"> St Vincent and Grenadines</option>
          <option value="SD"> Sudan</option>
          <option value="SR"> Suriname</option>
          <option value="SJ"> Svalbard and Jan Mayen</option>
          <option value="SE"> Sweden</option>
          <option value="CH"> Switzerland</option>
          <option value="SY"> Syria</option>
          <option value="ST"> São Tomé and Príncipe</option>
          <option value="TW"> Taiwan</option>
          <option value="TJ"> Tajikistan</option>
          <option value="TZ"> Tanzania</option>
          <option value="TH"> Thailand</option>
          <option value="GM"> The Gambia</option>
          <option value="TL"> Timor-Leste</option>
          <option value="TG"> Togo</option>
          <option value="TK"> Tokelau</option>
          <option value="TO"> Tonga</option>
          <option value="TT"> Trinidad and Tobago</option>
          <option value="TN"> Tunisia</option>
          <option value="TR"> Turkey</option>
          <option value="TM"> Turkmenistan</option>
          <option value="TC"> Turks and Caicos Islands</option>
          <option value="TV"> Tuvalu</option>
          <option value="UM"> U.S. Outlying Islands</option>
          <option value="VI"> U.S. Virgin Islands</option>
          <option value="UG"> Uganda</option>
          <option value="UA"> Ukraine</option>
          <option value="AE"> United Arab Emirates</option>
          <option value="GB"> United Kingdom</option>
          <option value="UY"> Uruguay</option>
          <option value="UZ"> Uzbekistan</option>
          <option value="VU"> Vanuatu</option>
          <option value="VA"> Vatican City</option>
          <option value="VE"> Venezuela</option>
          <option value="VN"> Vietnam</option>
          <option value="WF"> Wallis and Futuna</option>
          <option value="EH"> Western Sahara</option>
          <option value="YE"> Yemen</option>
          <option value="ZM"> Zambia</option>
          <option value="ZW"> Zimbabwe</option>
          <option value="AX"> Åland</option>
        </select>
        <label htmlFor="zipCode">Zip Code</label>
        <input
          name="zipCode"
          type="text"
          required={true}
          value={zipCode}
          onChange={(evt) => {
            setSubmitted(false);
            setZipCode(evt.target.value);
          }}
        />
        <input type="submit" value="Submit" />
      </form>
      {submitted && <Place zipCode={zipCode} countryCode={countryCode} />}
      <PlaceHistoryList />
    </div>
  );
}

const PlaceHistoryList = () => {
  const placeHistory = useReactiveVar(placeHistoryVar);
  return (
    <div>
      <h1>History</h1>
      <button onClick={() => placeHistoryVar([])}>Clean</button>
      {placeHistory?.map((entry, i) => (
        <div key={entry.zipCode + i}>
          <h3>
            {entry.countryCode} - {entry.zipCode}
          </h3>
          <div>{entry.name}</div>
          <div>{entry.state}</div>
        </div>
      ))}
    </div>
  );
};

export const FIND_PLACES = gql`
  query FindPlaces($countryCode: String!, $zipCode: String!) {
    findPlaces(countryCode: $countryCode, zipCode: $zipCode) {
      name
      state
    }
  }
`;

const Place = ({
  countryCode,
  zipCode,
}: {
  countryCode: string;
  zipCode: string;
}) => {
  const { data, called, loading } = useQuery<FindPlaces>(FIND_PLACES, {
    variables: {
      countryCode,
      zipCode,
    },
    onCompleted: (place) => {      
      placeHistoryVar([
        {
          countryCode,
          zipCode,
          name: place.findPlaces[0].name,
          state: place.findPlaces[0].state,
        },
        ...placeHistoryVar().slice(0, 4),
      ]);
    },
  });

  const place = data?.findPlaces[0];

  if (called && loading) return <p>Loading ...</p>;
  if (called && !data?.findPlaces)
    return <p style={{ color: "red" }}>Not Found :(</p>;

  return (
    <>
      {place && (
        <div>
          <h2>{place.name}</h2>
          <p>{place.state}</p>
        </div>
      )}
    </>
  );
};

export default App;
