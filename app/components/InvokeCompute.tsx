"use client";

import { useNilInvokeCompute, useNillion } from "@nillion/client-react-hooks";
import { NadaValue, ProgramId } from "@nillion/client-vms";
import { type ChangeEvent, type FC, useState } from "react";

export const InvokeCompute: FC = () => {
  const { client } = useNillion();
  const mutation = useNilInvokeCompute();
  const [programId, setProgramId] = useState("");
  const [copiedComputeResult, setComputeResultCopied] = useState(false);
  const isValidProgramId = ProgramId.safeParse(programId).success;

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setProgramId(event.target.value);
  }

  function handleClick(): void {
    // Values from qiro_nada_test.yaml
    const options = {
      programId,
      inputBindings: [{ party: "User", user: client.id }],
      outputBindings: [{ party: "User", users: [client.id] }],
      valueIds: [],
      computeTimeValues: [
        {
          name: "asset_turnover",
          value: NadaValue.new_secret_integer("3"),
        },
        {
          name: "cap_leverage",
          value: NadaValue.new_secret_integer("3"),
        },
        {
          name: "current_ratio",
          value: NadaValue.new_secret_integer("3"),
        },
        {
          name: "debt_equity",
          value: NadaValue.new_secret_integer("3"),
        },
        {
          name: "ebitda_revenue",
          value: NadaValue.new_secret_integer("3"),
        },
        {
          name: "interest_coverage",
          value: NadaValue.new_secret_integer("3"),
        },
        {
          name: "liquidity_ratio",
          value: NadaValue.new_secret_integer("3"),
        },
        {
          name: "net_interest_income",
          value: NadaValue.new_secret_integer("3"),
        },
        {
          name: "profit_margin",
          value: NadaValue.new_secret_integer("3"),
        },
        {
          name: "roa",
          value: NadaValue.new_secret_integer("3"),
        },
        {
          name: "roe",
          value: NadaValue.new_secret_integer("3"),
        },
      ],
    };
    mutation.execute(options);
  }

  let resultId = "";
  if (mutation.isSuccess) {
    resultId = mutation.data;
  } else if (mutation.isError) {
    resultId = mutation.error.message;
  }

  return (
    <div className="border border-gray-400 rounded-lg p-4 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Credit Score Computation</h2>
      <p className="my-2 italic text-sm mt-2">
        Using test values from qiro_nada_test.yaml (all metrics set to 3)
      </p>
      <div className="mt-2">
        Program Id:{" "}
        <input
          className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
          type="text"
          value={programId}
          onChange={handleChange}
        />
      </div>
      <ol className="list-disc pl-5">
        <li className="mt-2">Status: {mutation.status}</li>
        <li className="mt-2">
          Compute result Id:
          {mutation.isSuccess ? (
            <>
              {`${resultId.substring(0, 4)}...${resultId.substring(resultId.length - 4)}`}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(resultId);
                  setComputeResultCopied(true);
                  setTimeout(() => setComputeResultCopied(false), 2000);
                }}
              >
                {!copiedComputeResult ? " 📋" : " ✅"}
              </button>
            </>
          ) : (
            ""
          )}
        </li>
      </ol>
      <button
        className={`flex items-center justify-center px-4 py-2 border mt-2 rounded text-black mb-4 ${
          !isValidProgramId
            ? "opacity-50 cursor-not-allowed bg-gray-200"
            : "bg-white hover:bg-gray-100"
        }`}
        type="button"
        disabled={!isValidProgramId}
        onClick={handleClick}
      >
        Calculate Credit Score
      </button>
    </div>
  );
};
