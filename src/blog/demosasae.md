--- 
layout: article
title: Demo page of Sasae
date: 2024-01-04
category: "demo" 
---
All audio prompt and text condition are unseen and come from test-clean split of LibriTTS.
# Zero-shot voice cloning using audio prompt.

<table>
    <tr>
    <th>speaker ID</th>
    <th>text</th>
    <th>prompt</th>
    <th>Sasae</th>
    </tr>
{% for row in metadata_demo %}
    <tr style="border-bottom: 1px solid #000;">
        <td>{{ row.speaker_prompt }}  </td>
        <td>  {{ row.text_target }}</td>
        <td><audio controls=""><source src="/assets/exp_sasae/{{ row.row_nr }}_prompt.wav" type="audio/x-wav"></audio></td>
        <td><audio controls><source src="/assets/exp_sasae/{{ row.row_nr }}_synth.wav" type="audio/x-wav"></audio></td>
    </tr>
{% endfor %}
</table>
    </tr>
