pragma solidity ^0.8.17;

contract Vote {

    address internal owner;

    constructor() {
        owner = msg.sender;
    }
    enum statusType{ start, end, declare }
    struct Candidate {
        string name;
        uint256 voteCount;
        string registeredElection;
        string symbol;
    }

    struct Election {
        bool isActive;
        string winner;
        mapping(bytes32 => bool) usedIdentifiers;
        mapping(address => bool) usedId;
        string[] candidateNames;
        string role;
        uint256 timestamp;
        statusType status;
    }


    mapping(string => Candidate) public candidates;
    mapping(string => Election) public elections;
    mapping(address => bool) public registeredCandidates;
    string[] public electionNames;

    // Event emitted when a candidate is registered
    event CandidateRegistered(string electionName, string candidateName);

    // Event emitted when a vote is casted
    event VoteCasted(string electionName, string candidateName, string identifier);

    // Event emitted when the winner is declared for an election
    event WinnerDeclared(string electionName, string winnerName);

    // Create a new election
    function createElection(string memory electionName,string memory role) external {
        require(!isElectionActive(electionName), "Election already exists.");
        electionNames.push(electionName);
        elections[electionName].isActive = false;
        elections[electionName].role = role;
        elections[electionName].winner = '';
        elections[electionName].timestamp = block.timestamp;
        elections[electionName].status = statusType.start;
    }

    function startElection(string memory electionName) external {
        require(!isElectionActive(electionName), "Election is alredy active.");
        elections[electionName].isActive = true;
        elections[electionName].status = statusType.end;
    }

    function stopElection(string memory electionName) external {
        require(isElectionActive(electionName), "Election is alredy not active.");
        elections[electionName].isActive = false;
        elections[electionName].status = statusType.declare;
    }

    // Register as a candidate for an election
    function registerCandidate(string memory electionName, string memory candidateName,address candidateAddress,string memory symbol) external {
        require(isElectionActive(electionName), "Election is not active.");
        require(!registeredCandidates[candidateAddress], "Already registered as a candidate.");

        Election storage election = elections[electionName];
        require(election.isActive, "Election is not active.");

        candidates[candidateName] = Candidate(candidateName, 0, electionName,symbol);
        election.candidateNames.push(candidateName);
        registeredCandidates[candidateAddress] = true;

        emit CandidateRegistered(electionName, candidateName);
    }

    // Vote for a candidate in an election
    function vote(string memory electionName, string memory candidateName, string memory identifier) external {
        require(isElectionActive(electionName), "Election is not active.");
        // require(isCandidateRegistered(candidateName), "Candidate is not registered.");
        require(!hasElectionDeclaredWinner(electionName), "Winner already declared for this election.");
        bytes32 hashedIdentifier = hash(identifier);
        require(!elections[electionName].usedIdentifiers[hashedIdentifier], "Identifier already used.");
        require(!elections[electionName].usedId[msg.sender], "Public Id already used.");
        elections[electionName].usedIdentifiers[hashedIdentifier] = true;
        elections[electionName].usedId[msg.sender] = true;
        candidates[candidateName].voteCount++;
        emit VoteCasted(electionName, candidateName, identifier);
    }

    // Declare the winner for an election
    function declareWinner(string memory electionName) external {
        require(!hasElectionDeclaredWinner(electionName), "Winner already declared for this election.");
        require(!isElectionActive(electionName), "Election is still active.");

        Election storage election = elections[electionName];
        require(election.candidateNames.length > 0, "No candidates registered for this election.");

        string memory winnerName;
        uint256 maxVotes = 0;

        for (uint256 i = 0; i < election.candidateNames.length; i++) {
            string memory candidateName = election.candidateNames[i];
            uint256 voteCount = candidates[candidateName].voteCount;

            if (voteCount > maxVotes) {
                maxVotes = voteCount;
                winnerName = candidateName;
            }
        }
        elections[electionName].isActive = false;
        elections[electionName].winner = winnerName;
        emit WinnerDeclared(electionName, winnerName);
    }

    function getElectionData(string memory electionName) public view returns (bool,string memory,string memory,uint256,statusType) {
        return (elections[electionName].isActive,elections[electionName].winner,elections[electionName].role,elections[electionName].timestamp,elections[electionName].status);
    }

    // Function to get all active elections
    function getActiveElections() public view returns (string[] memory,string[] memory,uint256[] memory,bool[] memory) {
        uint256 activeCount = electionNames.length;
        string[] memory electionNamesArray = new string[](activeCount);
        string[] memory electionRolesArray = new string[](activeCount);
        uint256[] memory electionTimestampsArray = new uint256[](activeCount);
        bool[] memory electionActive = new bool[](activeCount);

        uint256 currentIndex = 0;
        // Populate arrays with active election details
        for (uint256 i = 0; i < electionNames.length; i++) {
            string memory electionName = electionNames[i];
            electionNamesArray[currentIndex] = electionName;
            electionRolesArray[currentIndex] = elections[electionName].role;
            electionTimestampsArray[currentIndex] = elections[electionName].timestamp;
            electionActive[currentIndex] = elections[electionName].isActive;
            currentIndex++;
        }

        return (electionNamesArray, electionRolesArray, electionTimestampsArray,electionActive);
    }

    // Get the candidates participating in a specific election
    function getCandidatesForElection(string memory electionName) public view returns (string[] memory,string[] memory) {
        string[] memory cn = elections[electionName].candidateNames;
        string[] memory csl = new string[](cn.length);
        for(uint i = 0; i < cn.length; i++){
            csl[i] = candidates[cn[i]].symbol;
        }
        return (cn,csl);
    }

    // Check if an election is active
    function isElectionActive(string memory electionName) public view returns (bool) {
        return elections[electionName].isActive;
    }

    // Check if a candidate is registered
    function isCandidateRegistered(string memory candidateName) public view returns (bool) {
        return bytes(candidates[candidateName].name).length > 0;
    }

    // Check if an election has declared a winner
    function hasElectionDeclaredWinner(string memory electionName) public view returns (bool) {
        return bytes(elections[electionName].winner).length != 0;
    }

    // Hashes the identifier using a cryptographic hash function (SHA-256)
    function hash(string memory identifier) internal pure returns (bytes32) {
        return keccak256(bytes(identifier));
    }

    function isOwner() public view returns(bool){
        return msg.sender == owner;
    }
}

