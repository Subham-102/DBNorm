import React from 'react';

// Component to check if the response is a 'DetectResponse'
const isDetectResponse = (result) => {
  return result && result.highestNormalForm !== undefined;
};

// Component to check if the response is a 'NormalizeResponse'
const isNormalizeResponse = (result) => {
  return result && result.decomposition !== undefined;
};

// Component to display an individual decomposed relation
const NormalizedTable = ({ relation }) => (
  <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
    <h5 className="font-bold text-lg mb-2 text-purple-700">{relation.name}</h5>
    <p className="text-gray-800 font-mono">
      Attributes: {"{" + relation.attributes.join(", ") + "}"}
    </p>
    {relation.fds && relation.fds.length > 0 && (
      <div className="mt-2">
        <h6 className="font-semibold text-sm text-gray-600">Functional Dependencies:</h6>
        <ul className="list-disc list-inside text-sm text-gray-500">
          {relation.fds.map((fd, fdIndex) => (
            <li key={fdIndex}>
              {"{" + fd.lhs.join(", ") + "} -> {" + fd.rhs.join(", ") + "}"}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

// Main Result Section component
export default function ResultSection({ result }) {
  if (!result) {
    return null; // Do not render anything if there's no result yet
  }

  const isDetect = isDetectResponse(result);
  const isNormalize = isNormalizeResponse(result);

  return (
    <section id="results" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Analysis & Normalization Results</h2>

        {/* Display Detection Results */}
        {isDetect && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-blue-800">Normal Form Detection</h3>
            <p className="text-lg font-semibold mb-2">
              Highest Normal Form: <span className="text-blue-600">{result.highestNormalForm}</span>
            </p>
            
            {result.reasons && result.reasons.length > 0 && (
              <div className="mt-4">
                <h4 className="font-bold text-gray-700">Reasons for Violation:</h4>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  {result.reasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.candidateKeys && result.candidateKeys.length > 0 && (
              <div className="mt-4">
                <h4 className="font-bold text-gray-700">Candidate Keys:</h4>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  {result.candidateKeys.map((key, index) => (
                    <li key={index}>{"{" + key.join(", ") + "}"}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Display Normalization Results */}
        {isNormalize && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-purple-800">
              Normalization Result to {result.targetNormalForm}
            </h3>
            
            {result.notes && result.notes.length > 0 && (
              <div className="mb-4">
                <h4 className="font-bold text-gray-700">Notes:</h4>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  {result.notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.decomposition && result.decomposition.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {result.decomposition.map((rel, index) => (
                  <NormalizedTable key={index} relation={rel} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}