require "rails_helper"

RSpec.describe Types::QueryType do
  describe "boards" do
    let!(:boards) { create_pair(:board) }

    let(:query) do
      %(query {
        boards {
          title
        }
      })
    end

    subject(:result) do
      RetrospectiveSchema.execute(query).as_json
    end

    it "returns all boards items" do
      expect(result.dig("data", "boards")).to match_array(
        items.map { |item| { "title" => item.title } }
      )
    end
  end
end