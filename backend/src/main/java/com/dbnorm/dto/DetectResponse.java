package com.dbnorm.dto;

import java.util.List;

public class DetectResponse {
    private String highestNormalForm;
    private List<String> reasons;
    private List<List<String>> candidateKeys;

    public String getHighestNormalForm() { return highestNormalForm; }
    public void setHighestNormalForm(String highestNormalForm) { this.highestNormalForm = highestNormalForm; }
    public List<String> getReasons() { return reasons; }
    public void setReasons(List<String> reasons) { this.reasons = reasons; }
    public List<List<String>> getCandidateKeys() { return candidateKeys; }
    public void setCandidateKeys(List<List<String>> candidateKeys) { this.candidateKeys = candidateKeys; }
	@Override
	public String toString() {
		return "DetectResponse [highestNormalForm=" + highestNormalForm + ", reasons=" + reasons + ", candidateKeys="
				+ candidateKeys + "]";
	}
	public DetectResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
}
